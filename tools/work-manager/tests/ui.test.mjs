import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM,VirtualConsole} from 'jsdom';
const html=(await readFile('ui/index.html','utf8')).replace('<script src="/manager.js" defer></script>','');
const script=await readFile('public/manager.js','utf8');
const tick=()=>new Promise(resolve=>setTimeout(resolve,10));
function setup(){
 const dom=new JSDOM(html,{url:'https://preview.example',runScripts:'outside-only',virtualConsole:new VirtualConsole()});const w=dom.window;
 w.structuredClone=structuredClone;w.confirm=()=>true;w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 w.WORK_PREVIEW={works:[{id:'one',name:'실제 사이트',type:'site',description:'메뉴 설명',url:'https://example.com',stage:'미확인',usage:'미확인',thumbnailId:'',posterId:'',createdDate:'',updatedAt:'',revision:1,archived:false}],assets:{}};
 w.eval(script);return {dom,w,d:w.document};
}
test('사이트 표시·검색·탭 전환과 빈 목록',async()=>{
 const {dom,w,d}=setup();await tick();assert.equal(d.querySelectorAll('.card').length,1);assert.match(d.querySelector('.meta').textContent,/미확인/);
 const search=d.getElementById('search');search.value='없는 이름';search.dispatchEvent(new w.Event('input'));assert.equal(d.querySelectorAll('.card').length,0);
 search.value='';search.dispatchEvent(new w.Event('input'));d.getElementById('prompt-tab').click();assert.match(d.getElementById('work-list').textContent,/등록된 프롬프트가 없습니다/);assert.equal(d.getElementById('prompt-tab').getAttribute('aria-selected'),'true');dom.window.close();
});
test('프롬프트 등록·수정·보관·복구와 HTML 삽입 방지',async()=>{
 const {dom,w,d}=setup();await tick();d.getElementById('prompt-tab').click();d.getElementById('add').click();const form=d.getElementById('work-form');form.elements.name.value='<img src=x onerror=alert(1)>';form.elements.prompt.value='테스트 원문';form.dispatchEvent(new w.Event('submit',{cancelable:true}));await tick();
 assert.equal(d.querySelectorAll('.card').length,1);assert.equal(d.querySelector('.card-title').textContent,'<img src=x onerror=alert(1)>');assert.equal(d.querySelector('.card-title img'),null);
 d.querySelector('[data-action=edit]').click();form.elements.name.value='수정한 프롬프트';form.dispatchEvent(new w.Event('submit',{cancelable:true}));await tick();assert.equal(d.querySelector('.card-title').textContent,'수정한 프롬프트');
 d.querySelector('[data-action=detail]').click();assert.match(d.getElementById('detail-body').textContent,/테스트 원문/);d.getElementById('archive').click();await tick();assert.equal(d.querySelectorAll('.card').length,0);
 const archived=d.getElementById('show-archived');archived.checked=true;archived.dispatchEvent(new w.Event('input'));assert.equal(d.querySelectorAll('.card').length,1);d.querySelector('[data-action=detail]').click();d.getElementById('archive').click();await tick();assert.equal(d.querySelectorAll('.card').length,0);
 archived.checked=false;archived.dispatchEvent(new w.Event('input'));assert.equal(d.querySelectorAll('.card').length,1);assert.equal(JSON.parse(w.localStorage.getItem('gayoung-work-preview-v1')).works.length,2);dom.window.close();
});
test('저장 실패 시 입력 유지·거짓 성공 표시 없음',async()=>{
 const {dom,w,d}=setup();await tick();w.Storage.prototype.setItem=function(){throw new Error('quota');};d.getElementById('add').click();const form=d.getElementById('work-form');form.elements.name.value='저장 안 된 작업';form.dispatchEvent(new w.Event('submit',{cancelable:true}));await tick();assert.equal(d.getElementById('editor').open,true);assert.equal(form.elements.name.value,'저장 안 된 작업');assert.match(d.getElementById('save-error').textContent,/아직 저장되지 않았습니다/);assert.equal(d.querySelectorAll('.card').length,1);dom.window.close();
});
test('미리보기와 로그인을 혼동하지 않도록 표시',async()=>{const{dom,d}=setup();await tick();assert.equal(d.getElementById('preview-note').hidden,false);assert.equal(d.getElementById('logout').hidden,true);assert.match(d.getElementById('preview-note').textContent,/실제 관리자 데이터와 연결되지 않았습니다/);dom.window.close();});
