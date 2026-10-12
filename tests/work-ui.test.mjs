import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import {pathToFileURL} from 'node:url';
const dir=await mkdtemp('.work-ui-test-');
try{
 await build({entryPoints:['components/WorkManager.tsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:dir+'/component.mjs',jsx:'automatic'});
 const {default:WorkManager}=await import(pathToFileURL(process.cwd()+'/'+dir+'/component.mjs'));
 const dom=new JSDOM('<div id="root"></div>',{url:'https://example.test'});
 globalThis.window=dom.window;globalThis.document=dom.window.document;Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});globalThis.IS_REACT_ACT_ENVIRONMENT=true;
 const React=await import('react');const {createRoot}=await import('react-dom/client');const {act}=React;
 const root=createRoot(document.getElementById('root'));
 const projects=[{id:'12345678-1234-4234-9234-123456789012',title:'테스트 사이트',summary:'메뉴 추천',url:'https://example.com',cover:'/covers/test.png',coverSrc:'/covers/test.png',visibility:'published'}];
 let saved=null,fail=false;
 const request=async(path,options)=>{if(options?.method==='PATCH'){const body=JSON.parse(options.body);return Response.json({...projects[0],visibility:body.visibility});}if(options?.method==='POST'){if(fail)throw new Error('저장 실패');saved=JSON.parse(options.body);return Response.json({...saved,updated_at:new Date().toISOString(),thumbnailSrc:'',posterSrc:''});}return Response.json([]);};
 const render=()=>root.render(React.createElement(WorkManager,{projects,request,onDirty:()=>{},onProjectChange:p=>{projects[0]=p;render();}}));
 const click=async text=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent===text);assert.ok(b,text);await act(async()=>b.click());};
 const input=async(el,value)=>{await act(async()=>{Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype,'value').set.call(el,value);el.dispatchEvent(new dom.window.Event('input',{bubbles:true}));});};
 await test('검색 제출·썸네일 링크·프롬프트 등록·저장 실패 입력 유지',async()=>{
  await act(async()=>render());assert.equal(document.querySelectorAll('.work-card').length,1);assert.equal(document.querySelector('.work-media a').href,'https://example.com/');
  const visibility=document.querySelector('.work-visibility select');
  await act(async()=>{visibility.value='hidden';visibility.dispatchEvent(new dom.window.Event('change',{bubbles:true}));});
  assert.equal(projects[0].visibility,'hidden');assert.equal(document.querySelectorAll('.work-card').length,1);assert.match(document.body.textContent,/관리자 목록에는 유지/);
  assert.ok(document.querySelector('.work-image-actions a[download]'));
  await input(document.getElementById('work-search'),'없는 작업');await click('검색');assert.equal(document.querySelectorAll('.work-card').length,0);
  await input(document.getElementById('work-search'),'');await click('프롬프트');await click('새 작업 +');
  await input(document.querySelector('.work-editor input[required]'),'새 프롬프트');
  fail=true;await act(async()=>document.querySelector('.work-editor form').dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})));
  assert.equal(document.querySelector('.work-editor input[required]').value,'새 프롬프트');assert.match(document.body.textContent,/저장 실패/);assert.equal(saved,null);
  fail=false;await act(async()=>document.querySelector('.work-editor form').dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})));
  assert.equal(saved.name,'새 프롬프트');assert.equal(saved.type,'prompt');assert.equal(document.querySelector('.work-editor'),null);assert.match(document.body.textContent,/새 프롬프트/);
 });
 await act(async()=>root.unmount());dom.window.close();
}finally{await rm(dir,{recursive:true,force:true});}
