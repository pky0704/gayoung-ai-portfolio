import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { getCache } from '@vercel/functions';


const ttl = 30 * 60;
const tokenPattern = /^[a-f0-9]{32}$/;
const store = () => getCache({ namespace: 'showcase-order-call' });

type Call = { id: string; number: string; nickname: string };
type Room = { hostHash: string; updatedAt: number; call: Call | null };

const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const json = (value: unknown, status = 200) =>
  Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });

export async function GET(request: Request) {
  const viewer = request.headers.get('x-demo-room') ?? '';
  if (!tokenPattern.test(viewer)) return json({ error: '연결 주소를 확인해 주세요.' }, 400);
  const room = await store().get(digest(viewer)) as Room | null;
  if (!room) return json({ error: '연결이 만료됐습니다. 직원용 화면에서 새 주소를 열어 주세요.' }, 404);
  return json({ call: room.call });
}

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({}, 415);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({}, 403);

  const encoded = await request.text();
  if (encoded.length > 640) return json({}, 413);

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(encoded);
    if (!payload || typeof payload !== 'object') return json({}, 400);
  } catch {
    return json({}, 400);
  }

  const cache = store();
  if (payload.action === 'create') {
    const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim();
    if (ip) {
      const limitKey = 'create:' + digest(ip);
      const count = Number(await cache.get(limitKey) ?? 0);
      if (count >= 12) return json({ error: '잠시 후 다시 시도해 주세요.' }, 429);
      await cache.set(limitKey, count + 1, { ttl: 60 });
    }
    const viewer = randomBytes(16).toString('hex');
    const host = randomBytes(16).toString('hex');
    await cache.set(digest(viewer), { hostHash: digest(host), updatedAt: 0, call: null }, { ttl });
    return json({ viewer, host });
  }

  const { viewer, host, action, number, nickname } = payload;
  if (typeof viewer !== 'string' || !tokenPattern.test(viewer) ||
      typeof host !== 'string' || !tokenPattern.test(host)) return json({}, 400);
  const key = digest(viewer);
  const room = await cache.get(key) as Room | null;
  if (!room) return json({ error: '연결이 만료됐습니다. 고객용 연결을 다시 만들어 주세요.' }, 404);
  if (room.hostHash !== digest(host)) return json({}, 403);
  const now = Date.now();
  if (now - room.updatedAt < 1000) return json({ error: '잠시 후 다시 시도해 주세요.' }, 429);
  let call: Call | null = null;
  if (action === 'call') {
    if (typeof number !== 'string' || !/^\d{1,6}$/.test(number) ||
        typeof nickname !== 'string' || nickname.length > 16 ||
        !/^[\p{L}\p{N} ]*$/u.test(nickname)) return json({ error: '번호와 예시 닉네임을 확인해 주세요.' }, 400);
    call = { id: randomUUID(), number, nickname };
  } else if (action !== 'reset') {
    return json({}, 400);
  }
  await cache.set(key, { hostHash: room.hostHash, updatedAt: now, call }, { ttl });
  return json({ call });
}
