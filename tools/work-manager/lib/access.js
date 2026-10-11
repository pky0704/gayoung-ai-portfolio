import 'server-only';
import {auth} from '../auth.js';
import {sameOrigin} from './policy.mjs';
export async function authorize(request, write=false) {
  const session=process.env.AUTH_SECRET ? await auth() : null;
  if(!session?.isAdmin) return Response.json({error:'로그인이 필요합니다.'},{status:401,headers:{'Cache-Control':'no-store'}});
  if(write && !sameOrigin(request,process.env.AUTH_URL)) return Response.json({error:'허용되지 않은 요청입니다.'},{status:403});
  return null;
}
export function json(data,status=200) { return Response.json(data,{status,headers:{'Cache-Control':'private, no-store'}}); }
export async function readJSON(request) {
  if(!request.headers.get('content-type')?.startsWith('application/json')) throw new Error('입력 형식을 확인해 주세요.');
  if(Number(request.headers.get('content-length'))>100000) throw new Error('입력 내용이 너무 큽니다.');
  const raw=await request.text();
  if(Buffer.byteLength(raw)>100000) throw new Error('입력 내용이 너무 큽니다.');
  return JSON.parse(raw);
}
