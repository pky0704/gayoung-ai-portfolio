export const stages = ['미확인','기획 중','개발 중','개발 완료','개발 종료'];
export const usages = ['미확인','사용 전','테스트 중','사용 중','사용 중단'];
export function allowedEmail(email, allowed) {
  return typeof email === 'string' && typeof allowed === 'string' && !!allowed.trim() && email.trim().toLowerCase() === allowed.trim().toLowerCase();
}
export function allowGoogle(account, profile, allowed) {
  return account?.provider === 'google' && profile?.email_verified === true && allowedEmail(profile.email, allowed);
}
export function sameOrigin(request, configured) {
  if (!configured) return false;
  try { return request.headers.get('origin') === new URL(configured).origin; } catch { return false; }
}
export function safeURL(value) {
  if (!value) return '';
  try { const u = new URL(value); return ['https:','http:'].includes(u.protocol) && !u.username && !u.password ? u.href : ''; } catch { return ''; }
}
export function validateWork(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('작업 내용을 확인해 주세요.');
  const out = {};
  const lengths = {name:100,description:500,url:2000,adminUrl:2000,notes:10000,prompt:50000,howTo:5000,versionLabel:100};
  for (const [key,max] of Object.entries(lengths)) {
    if (input[key] != null && typeof input[key] !== 'string') throw new Error('입력 형식을 확인해 주세요.');
    out[key] = (input[key] || '').trim();
    if (out[key].length > max) throw new Error('입력 내용이 너무 깁니다.');
  }
  if (!out.name) throw new Error('이름을 입력해 주세요.');
  if (!['site','prompt'].includes(input.type)) throw new Error('작업 종류를 선택해 주세요.');
  out.type = input.type;
  if (!stages.includes(input.stage) || !usages.includes(input.usage)) throw new Error('상태를 선택해 주세요.');
  out.stage=input.stage; out.usage=input.usage;
  for(const key of ['url','adminUrl']) if(out[key] && !safeURL(out[key])) throw new Error('주소는 http 또는 https로 시작해야 합니다.');
  out.createdDate = input.createdDate || '';
  if (out.createdDate && (!/^\d{4}-\d{2}-\d{2}$/.test(out.createdDate) || !Number.isFinite(Date.parse(out.createdDate)) || new Date(out.createdDate).toISOString().slice(0,10)!==out.createdDate)) throw new Error('만든 날짜를 확인해 주세요.');
  for (const key of ['thumbnailId','posterId']) {
    out[key]=input[key] || '';
    if(typeof out[key]!=='string' || (out[key] && !/^[a-zA-Z0-9_-]{1,100}$/.test(out[key]))) throw new Error('이미지 정보를 확인해 주세요.');
  }
  return out;
}
export function imageType(bytes) {
  if (bytes.length>=8 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'image/png';
  if (bytes.length>=3 && bytes[0]===255 && bytes[1]===216 && bytes[2]===255) return 'image/jpeg';
  if (bytes.length>=12 && bytes.subarray(0,4).toString()==='RIFF' && bytes.subarray(8,12).toString()==='WEBP') return 'image/webp';
  return '';
}
