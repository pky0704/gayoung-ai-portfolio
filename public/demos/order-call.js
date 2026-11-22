const byId = id => document.getElementById(id);
const fragment = new URLSearchParams(location.hash.slice(1));
const displayOnly = location.hash === '#display' || fragment.has('room');
const endpoint = '/api/order-call-demo';
let room = null;
let lastCall = null;
let soundOn = false;
let polling = false;

function status(text) {
  byId('feedback').textContent = text;
}

function show(call) {
  const changed = call?.id !== lastCall?.id;
  lastCall = call;
  byId('state').textContent = call ? '음식이 준비됐어요' : '호출 대기';
  byId('called').textContent = call?.number ?? '—';
  byId('called-nickname').textContent = call?.nickname ?? '';
  if (changed && call && soundOn && 'speechSynthesis' in window) {
    const voice = new SpeechSynthesisUtterance([call.nickname, ...call.number, '번 주문이 준비됐습니다.'].filter(Boolean).join(' '));
    voice.lang = 'ko-KR';
    window.speechSynthesis.speak(voice);
  }
}

async function send(payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '연결하지 못했습니다. 다시 시도해 주세요.');
  return result;
}

async function submit(action) {
  const number = byId('number').value.trim();
  const nickname = byId('nickname').value.trim();
  if (action === 'call' && !/^[\p{L}\p{N} ]*$/u.test(nickname)) {
    status('예시 닉네임은 문자, 숫자, 공백으로 입력해 주세요.');
    return;
  }
  try {
    if (room) {
      const { call } = await send({ action, ...room, number, nickname });
      show(call);
    } else {
      show(action === 'call' ? { id: Date.now(), number, nickname } : null);
    }
    status(action === 'call' ? '체험 화면에 호출을 보냈습니다.' : '체험 화면을 초기화했습니다.');
  } catch (error) {
    status(error.message);
  }
}

byId('sound').addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    status('이 브라우저에서는 화면 표시로 체험할 수 있습니다.');
    return;
  }
  soundOn = !soundOn;
  byId('sound').textContent = soundOn ? '소리 끄기' : '소리 켜기';
  if (soundOn) {
    const voice = new SpeechSynthesisUtterance('주문 호출 소리 확인');
    voice.lang = 'ko-KR';
    window.speechSynthesis.speak(voice);
  }
});

if (displayOnly) {
  byId('title').textContent = '가영이네 고객용 호출 화면';
  byId('controls').hidden = true;
  byId('pair').hidden = true;
  const viewer = fragment.get('room');
  if (!viewer) {
    show({ id: 'sample', number: '0127', nickname: '체험 손님' });
    status('예시 화면입니다. 직원용 체험에서 생성한 연결 주소로 실시간 표시를 볼 수 있습니다.');
  } else {
    async function refresh() {
      if (polling || document.hidden) return;
      polling = true;
      try {
        const response = await fetch(endpoint, { cache: 'no-store', headers: { 'X-Demo-Room': viewer } });
        const result = await response.json();
        if (!response.ok) {
          show(null);
          status(result.error || '연결 상태를 확인해 주세요.');
          if (response.status === 400 || response.status === 404) clearInterval(timer);
        } else {
          show(result.call);
          status('직원 화면에 연결됐습니다.');
        }
      } catch {
        status('네트워크 연결 확인 중');
      } finally {
        polling = false;
      }
    }
    const timer = setInterval(refresh, 2500);
    void refresh();
  }
} else {
  byId('controls').addEventListener('submit', event => {
    event.preventDefault();
    void submit('call');
  });
  byId('reset').addEventListener('click', () => void submit('reset'));
  byId('pair').addEventListener('click', async () => {
    byId('pair').disabled = true;
    try {
      room = await send({ action: 'create' });
      const url = new URL(location.pathname, location.origin);
      url.hash = 'room=' + room.viewer;
      byId('display-url').value = url.href;
      byId('open').href = url.href;
      byId('pairing').hidden = false;
      show(null);
      status('이 주소를 다른 기기에서 열면 같은 예시 호출이 표시됩니다.');
    } catch (error) {
      status(error.message);
    } finally {
      byId('pair').disabled = false;
    }
  });
  byId('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(byId('display-url').value);
      status('고객용 링크를 복사했습니다.');
    } catch {
      byId('display-url').select();
      status('선택된 주소를 길게 눌러 직접 복사해 주세요.');
    }
  });
}
