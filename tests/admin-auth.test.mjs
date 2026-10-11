import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {build} from 'esbuild';
const dir=await mkdtemp('.admin-test-');
const password=randomBytes(24).toString('base64url');
process.env.ADMIN_PASSWORD=password;
process.env.SUPABASE_SERVICE_ROLE_KEY=randomBytes(32).toString('base64url');
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';
try{
 await build({stdin:{contents:"export * from './app/api/admin/session/route'; export {authorize} from './lib/supabase';",resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',packages:'external',outfile:dir+'/routes.mjs',plugins:[{name:'test-dependencies',setup(b){
 b.onResolve({filter:/^server-only$/},()=>({path:'empty',namespace:'test'}));
 b.onResolve({filter:/^@supabase\/supabase-js$/},()=>({path:'supabase',namespace:'test'}));
 b.onResolve({filter:/^next\/server$/},()=>({path:'next/server.js',external:true}));
 b.onLoad({filter:/.*/,namespace:'test'},({path})=>({contents:path==='empty'?'':`export function createClient(){return {rpc:async()=>({data:process.env.TEST_LIMIT!=='deny',error:process.env.TEST_LIMIT==='error'?{}:null})}}`,loader:'js'}));
 }}]});
 const route=await import(pathToFileURL(process.cwd()+'/'+dir+'/routes.mjs'));
 const req=(method='POST',body={password},origin='https://example.test',cookie='')=>new Request('https://example.test/api/admin/session',{method,headers:{origin,cookie,'content-type':'application/json'},...(method==='POST'?{body:JSON.stringify(body)}:{})});
 await test('login checks origin, password, shared rate budget; session authorizes and logout clears cookie',async()=>{
  assert.equal((await route.POST(req('POST',{password},'https://attacker.test'))).status,403);
  assert.equal((await route.POST(req('POST',{password:'wrong'}))).status,401);
  assert.equal((await route.POST(req('POST',null))).status,401);
  process.env.TEST_LIMIT='deny';assert.equal((await route.POST(req())).status,429);
  process.env.TEST_LIMIT='error';assert.equal((await route.POST(req())).status,503);
  delete process.env.TEST_LIMIT;
  const result=await route.POST(req());assert.equal(result.status,200);
  const cookie=result.headers.get('set-cookie');assert.match(cookie,/HttpOnly/i);assert.match(cookie,/SameSite=strict/i);assert.match(cookie,/Max-Age=43200/);
  assert.equal(await route.authorize(req('GET')),null);
  assert.ok(await route.authorize(req('GET',null,'https://example.test',cookie.split(';')[0])));
  process.env.ADMIN_PASSWORD=password+'rotated';assert.equal(await route.authorize(req('GET',null,'https://example.test',cookie.split(';')[0])),null);
  const logout=await route.DELETE(req('DELETE'));assert.match(logout.headers.get('set-cookie'),/Max-Age=0/);
  assert.equal((await route.DELETE(req('DELETE',null,'https://attacker.test'))).status,403);
  delete process.env.ADMIN_PASSWORD;assert.equal((await route.POST(req())).status,503);
 });
}finally{await rm(dir,{recursive:true,force:true});}
