import QRCode from 'qrcode';
const $=id=>document.getElementById(id);
const preview=window.WORK_PREVIEW || null;
const storageKey='gayoung-work-preview-v1';
let works=[], tab='site', editing=null, draftImages={}, dirty=false, saving=false, toastTimer;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(value) {try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password?u.href:'';}catch{return '';}}
function imageURL(id) {if(!id)return '';if(preview)return preview.assets[id] || '';return '/api/assets/'+encodeURIComponent(id);}
function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,4200);}
function date(value){if(!value)return '미확인';const d=new Date(value);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Seoul'}).format(d):'미확인';}
function badge(value){const cl=value==='개발 중'||value==='기획 중'?'progress':value==='사용 중'||value==='개발 완료'?'ready':'';return `<span class="badge ${cl}">${esc(value||'미확인')}</span>`;}
function persist(next){try{localStorage.setItem(storageKey,JSON.stringify({works:next,assets:Object.fromEntries(Object.entries(preview.assets).filter(([id])=>!id.startsWith('seed-')))}));}catch{throw new Error('브라우저에 저장 공간이 부족하거나 저장이 제한되어 있습니다. 변경 내용은 아직 저장되지 않았습니다.');}}
async function request(path,options={}){const r=await fetch(path,{...options,credentials:'same-origin',cache:'no-store'});const data=await r.json();if(!r.ok){if(r.status===401)toast('로그인이 만료되었습니다. 다시 로그인해 주세요.');throw new Error(data.error||'요청을 처리하지 못했습니다.');}return data;}
async function load(){
  $('load-error').hidden=true;$('retry').hidden=true;$('work-list').setAttribute('aria-busy','true');
  try{
    if(preview){works=structuredClone(preview.works);try{const saved=JSON.parse(localStorage.getItem(storageKey));if(saved&&Array.isArray(saved.works)){works=saved.works;Object.assign(preview.assets,saved.assets||{});}}catch{toast('저장된 미리보기를 읽지 못해 기본 목록을 표시합니다.');}}
    else works=await request('/api/works');
    render();
  }catch(e){$('load-error').textContent=e.message;$('load-error').hidden=false;$('retry').hidden=false;$('work-list').replaceChildren();}
  finally{$('work-list').setAttribute('aria-busy','false');}
}
function render(){
  const active=works.filter(w=>!w.archived);
  $('count-all').textContent=active.length;
  $('count-progress').textContent=active.filter(w=>['기획 중','개발 중'].includes(w.stage)).length;
  $('count-use').textContent=active.filter(w=>w.usage==='사용 중').length;
  $('count-unknown').textContent=active.filter(w=>w.stage==='미확인'||w.usage==='미확인').length;
  $('site-count').textContent=active.filter(w=>w.type==='site').length;$('prompt-count').textContent=active.filter(w=>w.type==='prompt').length;
  const query=$('search').value.trim().toLowerCase();const stage=$('stage-filter').value,usage=$('usage-filter').value,archived=$('show-archived').checked;
  const filtered=works.filter(w=>w.type===tab&&!!w.archived===archived&&(!stage||w.stage===stage)&&(!usage||w.usage===usage)&&(!query||(w.name+' '+w.description).toLowerCase().includes(query)));
  $('result-count').textContent=filtered.length+'개 작업';
  $('work-list').innerHTML=filtered.length?filtered.map(w=>{
    const img=imageURL(w.thumbnailId),url=safeURL(w.url);
    const thumbnail=img?`<img class="thumb" src="${esc(img)}" alt="${esc(w.name)} 카카오톡 썸네일" loading="lazy">`:`<div class="thumb thumb-empty">${w.type==='prompt'?'프롬프트':'썸네일 미등록'}</div>`;
    return `<article class="card" data-id="${esc(w.id)}"><div class="card-info"><h2 class="card-title">${esc(w.name)}</h2><p class="card-description">${esc(w.description||'설명을 등록해 주세요.')}</p><div class="badges">${badge(w.stage)}${badge(w.usage)}${w.archived?'<span class="badge">보관됨</span>':''}</div><div class="meta"><span>만든 날 ${esc(date(w.createdDate))}</span><span>수정 ${esc(date(w.updatedAt))}</span></div><div class="assets"><button data-action="thumbnail" ${img?'':'disabled'}>썸네일 ${img?'원본 보기':'없음'}</button><button data-action="qr" ${url?'':'disabled'}>QR ${url?'보기':'링크 필요'}</button><button data-action="poster" ${w.posterId?'':'disabled'}>포스터 ${w.posterId?'보기':'없음'}</button></div><div class="card-actions"><button class="secondary" data-action="detail">상세 보기</button><button class="secondary" data-action="edit">수정</button></div></div><div class="card-media">${url?`<a class="thumbnail-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(w.name)} 사이트 열기 (새 창)">${thumbnail}</a>`:thumbnail}${url?`<a class="primary site-open" href="${esc(url)}" target="_blank" rel="noopener noreferrer">사이트 열기 ↗</a>`:'<span class="link-missing">사이트 링크 미등록</span>'}</div></article>`;
  }).join(''):`<div class="empty"><strong>${tab==='prompt'?'등록된 프롬프트가 없습니다.':'표시할 작업이 없습니다.'}</strong><p>${query||stage||usage?'검색어나 필터를 바꿔 보세요.':'새 작업 등록 버튼으로 추가해 주세요.'}</p></div>`;
}
function setTab(value){tab=value;document.querySelectorAll('[data-tab]').forEach(b=>{const selected=b.dataset.tab===value;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});$('work-list').setAttribute('aria-labelledby',value+'-tab');render();}
document.querySelectorAll('[data-tab]').forEach(b=>{b.onclick=()=>setTab(b.dataset.tab);b.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();setTab(e.key==='Home'?'site':e.key==='End'?'prompt':tab==='site'?'prompt':'site');$(tab+'-tab').focus();}};});
['search','stage-filter','usage-filter','show-archived'].forEach(id=>$(id).addEventListener('input',render));
function showDialog(id){const dialog=$(id);if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');}
function closeDialog(id){if(id==='editor'&&saving)return;if(id==='editor'&&dirty&&!confirm('저장하지 않은 내용이 있습니다. 닫을까요?'))return;$(id).close();}
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeDialog(b.dataset.close));
$('editor').addEventListener('cancel',e=>{if(saving){e.preventDefault();return;}if(dirty&&!confirm('저장하지 않은 내용이 있습니다. 닫을까요?'))e.preventDefault();});
const form=$('work-form');
function refreshImage(key){const src=imageURL(draftImages[key+'Id']);$(key+'-preview').innerHTML=src?`<img alt="선택한 ${key==='poster'?'포스터':'썸네일'}" src="${esc(src)}">`:'등록된 이미지 없음';}
function promptFields(){$('prompt-fields').hidden=form.elements.type.value!=='prompt';}
function openEditor(work=null){
  editing=work;form.reset();$('save-error').hidden=true;draftImages={thumbnailId:work?.thumbnailId||'',posterId:work?.posterId||''};
  $('editor-title').textContent=work?'작업 수정':'새 작업 등록';
  const values=work||{type:tab,stage:'기획 중',usage:'사용 전'};
  for(const key of ['type','name','description','createdDate','stage','usage','url','adminUrl','prompt','howTo','versionLabel','notes'])if(form.elements[key])form.elements[key].value=values[key]||'';
  refreshImage('thumbnail');refreshImage('poster');promptFields();dirty=false;showDialog('editor');form.elements.name.focus();
}
form.addEventListener('input',()=>dirty=true);form.elements.type.onchange=promptFields;
$('add').onclick=()=>openEditor();$('retry').onclick=load;
async function upload(key,file){
  if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>3*1024*1024){toast('3MB 이하 PNG·JPG·WebP를 선택해 주세요.');return;}
  $('save').disabled=true;
  try{
    let id;
    if(preview){id=crypto.randomUUID();const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});preview.assets[id]=src;}
    else{const data=new FormData();data.append('file',file);id=(await request('/api/assets',{method:'POST',body:data})).id;}
    draftImages[key+'Id']=id;dirty=true;refreshImage(key);
  }catch(e){toast(e.message||'이미지를 읽지 못했습니다.');}finally{$('save').disabled=false;}
}
for(const key of ['thumbnail','poster']){$(key+'-file').onchange=e=>upload(key,e.target.files[0]);$('remove-'+key).onclick=()=>{draftImages[key+'Id']='';dirty=true;refreshImage(key);};}
async function saveWork(data,old){
  if(preview){const saved={...data,id:old?.id||crypto.randomUUID(),revision:(old?.revision||0)+1,updatedAt:new Date().toISOString()};const next=old?works.map(w=>w.id===old.id?saved:w):[saved,...works];persist(next);works=next;return saved;}
  const saved=await request(old?'/api/works/'+encodeURIComponent(old.id):'/api/works',{method:old?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,revision:old?.revision})});works=old?works.map(w=>w.id===old.id?saved:w):[saved,...works];return saved;
}
form.onsubmit=async e=>{
  e.preventDefault();if(saving)return;const data={...Object.fromEntries(new FormData(form)),...draftImages,archived:editing?.archived||false};
  if(!data.name.trim()){toast('이름을 입력해 주세요.');return;}
  if((data.url&&!safeURL(data.url))||(data.adminUrl&&!safeURL(data.adminUrl))){toast('http 또는 https로 시작하는 주소를 입력해 주세요.');return;}
  saving=true;$('save').disabled=true;$('save').textContent='저장 중…';$('save-error').hidden=true;
  try{await saveWork(data,editing);dirty=false;$('editor').close();tab=data.type;setTab(tab);toast(preview?'이 브라우저에 저장했습니다.':'저장했습니다.');}
  catch(error){$('save-error').textContent=error.message;$('save-error').hidden=false;}
  finally{saving=false;$('save').disabled=false;$('save').textContent='저장하기';}
};
async function copy(text){
  try{if(!navigator.clipboard?.writeText)throw new Error();await navigator.clipboard.writeText(text);toast('복사했습니다.');}
  catch{$('viewer-title').textContent='텍스트 복사';$('viewer-body').innerHTML='<p>아래 내용을 선택한 뒤 복사해 주세요.</p><textarea class="manual-copy" rows="8" readonly></textarea>';$('viewer-body').querySelector('textarea').value=text;showDialog('viewer');const box=$('viewer-body').querySelector('textarea');box.focus();box.select();}
}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function viewAsset(work,key){
  const src=imageURL(work[key+'Id']);if(!src){toast('등록된 이미지가 없습니다.');return;}
  const title=work.name+' '+(key==='poster'?'포스터':'썸네일');$('viewer-title').textContent=title;
  $('viewer-body').innerHTML=`<img class="viewer-image" src="${esc(src)}" alt="${esc(title)}"><button class="secondary" id="image-download">이미지 다운로드</button>`;
  showDialog('viewer');$('image-download').onclick=async()=>{try{const r=await fetch(src,{credentials:'same-origin'});if(!r.ok)throw new Error();const blob=await r.blob();const ext=blob.type==='image/jpeg'?'jpg':blob.type==='image/webp'?'webp':'png';downloadBlob(blob,title+'.'+ext);}catch{toast('이미지를 다운로드하지 못했습니다.');}};
}
async function viewQR(work){
  const url=safeURL(work.url);if(!url)return;
  try{const src=await QRCode.toDataURL(url,{width:600,margin:4,errorCorrectionLevel:'M'});$('viewer-title').textContent=work.name+' QR';$('viewer-body').innerHTML=`<img class="viewer-image qr-image" src="${src}" alt="${esc(work.name)} 바로가기 QR 코드"><p class="prose">${esc(url)}</p><a class="secondary" download="${esc(work.name)}-QR.png" href="${src}">QR 다운로드</a>`;showDialog('viewer');}catch{toast('주소가 너무 길어 QR을 만들지 못했습니다.');}
}
function detail(work){
  $('detail-title').textContent=work.name;
  let html=`<div class="badges">${badge(work.stage)}${badge(work.usage)}</div><section class="detail-section"><h3>설명</h3><p class="prose">${esc(work.description||'등록된 설명이 없습니다.')}</p></section><section class="detail-section"><h3>작업 기록</h3><p>만든 날 ${esc(date(work.createdDate))}<br>최근 수정 ${esc(date(work.updatedAt))}</p></section>`;
  const links=[['url','사이트 열기'],['adminUrl','관리자 페이지']].filter(([key])=>safeURL(work[key]));
  if(links.length)html+=`<section class="detail-section detail-links">${links.map(([key,label])=>`<a class="secondary" href="${esc(safeURL(work[key]))}" rel="noopener noreferrer" target="_blank">${label} ↗</a>`).join('')}</section>`;
  if(work.type==='prompt')html+=`<section class="detail-section"><h3>프롬프트 ${esc(work.versionLabel||'')}</h3><div class="code-text">${esc(work.prompt||'프롬프트 원문을 등록해 주세요.')}</div>${work.prompt?'<button id="copy-prompt" class="secondary">프롬프트 복사</button>':''}</section><section class="detail-section"><h3>사용 방법</h3><p class="prose">${esc(work.howTo||'등록된 사용 방법이 없습니다.')}</p></section>`;
  html+=`<section class="detail-section"><h3>사용성·개선 메모</h3><p class="prose">${esc(work.notes||'등록된 메모가 없습니다.')}</p></section><div class="detail-links"><button class="primary" id="detail-edit">수정하기</button><button class="secondary" id="archive">${work.archived?'보관 해제':'작업 보관'}</button></div>`;
  $('detail-body').innerHTML=html;showDialog('detail');$('detail-edit').onclick=()=>{$('detail').close();openEditor(work);};
  if($('copy-prompt'))$('copy-prompt').onclick=()=>copy(work.prompt);
  $('archive').onclick=async()=>{if(!work.archived&&!confirm('목록에서 잠시 보관할까요? 보관한 작업에서 다시 꺼낼 수 있습니다.'))return;$('archive').disabled=true;try{await saveWork({...work,archived:!work.archived},work);$('detail').close();render();toast(work.archived?'보관을 해제했습니다.':'보관했습니다.');}catch(e){toast(e.message);$('archive').disabled=false;}};
}
$('work-list').onclick=e=>{const b=e.target.closest('[data-action]');if(!b)return;const work=works.find(w=>w.id===b.closest('[data-id]')?.dataset.id);if(!work)return;const action=b.dataset.action;if(action==='edit')openEditor(work);else if(action==='detail')detail(work);else if(action==='qr')viewQR(work);else viewAsset(work,action);};
$('export').onclick=()=>{downloadBlob(new Blob([JSON.stringify({exportedAt:new Date().toISOString(),works},null,2)],{type:'application/json'}),'가영-작업목록-백업.json');toast('목록을 백업했습니다. 이미지 원본은 포함하지 않습니다.');};
$('logout').onclick=async()=>{try{const {csrfToken}=await request('/api/auth/csrf');const f=document.createElement('form');f.method='POST';f.action='/api/auth/signout';for(const [name,value]of Object.entries({csrfToken,callbackUrl:location.origin+'/'})){const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;f.append(input);}document.body.append(f);f.submit();}catch{toast('로그아웃하지 못했습니다. 다시 시도해 주세요.');}};
if(preview){$('preview-note').hidden=false;$('logout').hidden=true;document.title='가영의 작업 관리함 · 화면 미리보기';}
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
load();

document.getElementById('search-form').addEventListener('submit',event=>{event.preventDefault();document.getElementById('search').dispatchEvent(new Event('input',{bubbles:true}));});
