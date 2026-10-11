import {authorize,json} from '../../../../lib/access.js';
import {db} from '../../../../lib/db.js';
export async function GET(request,{params}) {
  const denied=await authorize(request); if(denied)return denied;
  try {
    const {id}=await params;const rows=await db()`SELECT mime,bytes_base64 FROM work_assets WHERE id=${id}`;
    if(!rows.length)return json({error:'이미지를 찾지 못했습니다.'},404);
    return new Response(Buffer.from(rows[0].bytes_base64,'base64'),{headers:{'Content-Type':rows[0].mime,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
  } catch{return json({error:'이미지를 불러오지 못했습니다.'},503);}
}
