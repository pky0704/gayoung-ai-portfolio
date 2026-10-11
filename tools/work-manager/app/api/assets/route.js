import {authorize,json} from '../../../lib/access.js';
import {db} from '../../../lib/db.js';
import {imageType} from '../../../lib/policy.mjs';
export async function POST(request) {
  const denied=await authorize(request,true); if(denied)return denied;
  if(Number(request.headers.get('content-length'))>3400000) return json({error:'이미지는 3MB 이하로 올려 주세요.'},413);
  try {
    const form=await request.formData(); const file=form.get('file');
    if(!file||typeof file.arrayBuffer!=='function'||file.size>3*1024*1024) return json({error:'3MB 이하 PNG, JPG, WebP를 선택해 주세요.'},400);
    const bytes=Buffer.from(await file.arrayBuffer());const mime=imageType(bytes);
    if(!mime)return json({error:'PNG, JPG, WebP 이미지로 올려 주세요.'},400);
    const id=crypto.randomUUID();
    await db()`INSERT INTO work_assets (id,mime,bytes_base64) VALUES (${id},${mime},${bytes.toString('base64')})`;
    return json({id},201);
  }catch{return json({error:'이미지를 저장하지 못했습니다.'},503);}
}
