import {authorize,json,readJSON} from '../../../lib/access.js';
import {db,serialize} from '../../../lib/db.js';
import {validateWork} from '../../../lib/policy.mjs';
export async function GET(request) {
  const denied=await authorize(request); if(denied)return denied;
  try { return json((await db()`SELECT * FROM work_items ORDER BY updated_at DESC`).map(serialize)); }
  catch { return json({error:'저장 내용을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'},503); }
}
export async function POST(request) {
  const denied=await authorize(request,true); if(denied)return denied;
  let data; try {data=validateWork(await readJSON(request));} catch(e){return json({error:e.message},400);}
  try {
    const id=crypto.randomUUID();
    const rows=await db()`INSERT INTO work_items (id,data) VALUES (${id},${JSON.stringify(data)}::jsonb) RETURNING *`;
    return json(serialize(rows[0]),201);
  } catch {return json({error:'저장하지 못했습니다. 입력 내용은 유지됩니다.'},503);}
}
