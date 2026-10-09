/* Kakao guidance: gesture-only external opening; no guarantee of app switching. */
(function () {
  'use strict';
  var ua = navigator.userAgent || '';
  if (!/KAKAOTALK/i.test(ua) || /scrap|crawler|bot/i.test(ua)) return;
  window.RestaurantBrowserGuard = { blocked: true };
  if (document.getElementById('kakao-browser-guide')) return;
  var url = window.location.href;
  var ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  var english = (document.documentElement.lang || 'ko').slice(0, 2) !== 'ko';
  var copy = english ? {
    eyebrow: 'Opening from KakaoTalk?', title: 'Continue in your browser',
    intro: 'Please open this site outside KakaoTalk before you start.',
    open: 'Open in another browser', hint: 'The button tries to open your browser.',
    fallback: 'If nothing opens, use “Open in another browser” in the KakaoTalk menu or share menu. You can also copy this address and paste it into your browser.',
    label: 'Site address', copy: 'Copy address', copied: 'Address copied. Paste it into your browser.',
    manual: 'Touch and hold the selected address to copy it.',
    pending: 'If your browser did not open, copy the address below.',
    note: 'How this works may differ by phone and KakaoTalk version.',
    confirm: 'Open another browser?', cancel: 'Cancel'
  } : {
    eyebrow: '카카오톡에서 오셨나요?', title: '다른 브라우저에서\n이어서 이용해 주세요.',
    intro: '사이트를 편하게 이용하려면\n카카오톡 밖에서 열어 주세요.',
    open: '외부 브라우저로 열기 ↗', hint: '버튼을 누르면 브라우저 이동을 시도해요.',
    fallback: '카카오톡의 메뉴 또는 공유 버튼에 ‘다른 브라우저로 열기’가 보이면 선택해 주세요. 메뉴가 없으면 아래 주소를 복사해 '+(ios ? 'Safari 등 사용하시는 브라우저' : '사용하시는 브라우저')+' 주소창에 붙여넣어 주세요.',
    label: '사이트 주소', copy: '주소 복사', copied: '주소를 복사했어요. 브라우저 주소창에 붙여넣어 주세요.',
    manual: '자동 복사가 어려워요. 선택된 주소를 길게 눌러 복사해 주세요.',
    pending: '이동하지 않았다면 아래 주소를 복사해 브라우저에서 열어 주세요.',
    note: '휴대폰과 카카오톡 버전에 따라 여는 방법이 다를 수 있어요.',
    confirm: '다른 브라우저에서 열까요?', cancel: '취소'
  };
  function mount() {
    if (document.getElementById('kakao-browser-guide')) return;

    var root = document.createElement('section'); root.id = 'kakao-browser-guide'; root.lang = english ? 'en' : 'ko';
    root.setAttribute('aria-labelledby', 'kg-title');
    root.innerHTML = '<div class="kg-inner"><p class="kg-eyebrow"></p><h1 id="kg-title"></h1><p class="kg-intro"></p><button type="button" id="kg-open"></button><p class="kg-hint" id="kg-status" role="status" aria-live="polite"></p><div class="kg-box"><p id="kg-fallback"></p><label for="kg-url"></label><input id="kg-url" type="text" readonly spellcheck="false"><button type="button" id="kg-copy" class="kg-secondary"></button><p class="kg-hint" id="kg-copy-status" role="status" aria-live="polite"></p></div><p class="kg-hint" id="kg-note"></p></div>';
    function el(selector) { return root.querySelector(selector); }
    var texts = {'.kg-eyebrow':copy.eyebrow,'#kg-title':copy.title,'.kg-intro':copy.intro,'#kg-open':copy.open,'#kg-status':copy.hint,'#kg-fallback':copy.fallback,'label':copy.label,'#kg-copy':copy.copy,'#kg-note':copy.note};
    Object.keys(texts).forEach(function (key) { el(key).textContent = texts[key]; });
    el('#kg-url').value = url;
    document.body.appendChild(root);
    document.documentElement.classList.add('kakao-guide-active');
    var dialog = document.createElement('dialog');
    dialog.setAttribute('aria-labelledby','kg-confirm-title');
    dialog.innerHTML = '<h2 id="kg-confirm-title"></h2><p></p><button type="button" id="kg-confirm" autofocus></button><button type="button" class="kg-secondary" id="kg-cancel"></button>';
    root.appendChild(dialog);
    el('#kg-confirm-title').textContent = copy.confirm;
    dialog.querySelector('p').textContent = copy.intro;
    el('#kg-confirm').textContent = copy.open; el('#kg-cancel').textContent = copy.cancel;
    function closeDialog() { if (dialog.open) dialog.close(); el('#kg-open').focus(); }
    function openExternal() {
      closeDialog(); el('#kg-status').textContent = copy.pending;
      // Unofficial best-effort Kakao scheme; only called by a user gesture.
      try { window.location.assign('kakaotalk://web/openExternal?url=' + encodeURIComponent(url)); } catch (_) { /* Inline fallback remains available. */ }
    }
    el('#kg-open').addEventListener('click',openExternal);
    el('#kg-confirm').addEventListener('click',openExternal);
    el('#kg-cancel').addEventListener('click',closeDialog);
    dialog.addEventListener('cancel',function(event){event.preventDefault();closeDialog();});
    el('#kg-copy').addEventListener('click',function () {
      function manual() { var input=el('#kg-url');input.focus();input.select();input.setSelectionRange(0,url.length);el('#kg-copy-status').textContent=copy.manual; }
      if (!navigator.clipboard || !navigator.clipboard.writeText) { manual();return; }
      navigator.clipboard.writeText(url).then(function(){el('#kg-copy-status').textContent=copy.copied;},manual);
    });
    if (typeof dialog.showModal === 'function') { try {dialog.showModal();} catch (_) {dialog.remove();} } else {dialog.remove();el('#kg-open').focus();}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',mount,{once:true}); else mount();
})();
