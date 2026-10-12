import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import {pathToFileURL} from 'node:url';
const dir=await mkdtemp('.password-ui-test-');
try{
 await build({entryPoints:['components/Admin.tsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:dir+'/component.mjs',jsx:'automatic',plugins:[{name:'image-stub',setup(b){b.onResolve({filter:/^next\/image$/},()=>({path:'image',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export default function Image(){return null}',loader:'js'}));}}]});
 const dom=new JSDOM('<div id="root"></div>',{url:'https://example.test'});
 globalThis.window=dom.window;globalThis.document=dom.window.document;Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});globalThis.IS_REACT_ACT_ENVIRONMENT=true;
 globalThis.fetch=async()=>Response.json({signedIn:false});
 const React=await import('react');const {createRoot}=await import('react-dom/client');const {default:Admin}=await import(pathToFileURL(process.cwd()+'/'+dir+'/component.mjs'));
 const root=createRoot(document.getElementById('root'));
 await test('눈 아이콘은 입력값을 유지하며 표시·숨김을 전환하고 폼을 제출하지 않음',async()=>{
 await React.act(async()=>root.render(React.createElement(Admin,{ready:true})));
 const input=document.querySelector('input');assert.equal(input.type,'password');await React.act(async()=>{Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype,'value').set.call(input,'sample-only');input.dispatchEvent(new dom.window.Event('input',{bubbles:true}));});
 const button=document.querySelector('.password-toggle');assert.equal(button.type,'button');
 await React.act(async()=>button.click());assert.equal(input.type,'text');assert.equal(input.value,'sample-only');assert.equal(button.getAttribute('aria-label'),'비밀번호 숨기기');
 await React.act(async()=>button.click());assert.equal(input.type,'password');assert.equal(button.getAttribute('aria-pressed'),'false');
 });
 await React.act(async()=>root.unmount());dom.window.close();
}finally{await rm(dir,{recursive:true,force:true});}
