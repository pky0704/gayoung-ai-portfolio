import {authorize,json,readJSON} from '../../../../lib/access.js';
import {db,serialize} from '../../../../lib/db.js';
import {validateWork} from '../../../../lib/policy.mjs';
export async function PATCH(request,{params}) {
  const denied=await authorize(request,true); if(denied)return denied;
  const {id}=await params;
  let body,data; try {
    body=await readJSON(request); data=validateWork(body);
    if(!Number.isInteger(body.revision)||body.revision<1||typeof body.archived!=='boolean') throw new Error('다시 불러온 후 수정해 주세요.');
  } catch(e){return json({error:e.message},400);}
  try {
    const rows=await db()`UPDATE work_items SET data=${JSON.stringify(data)}::jsonb, archived=${body.archived}, revision=revision+1,updated_at=NOW() WHERE id=${id} AND revision=${body.revision} RETURNING *`;
    if(!rows.length) return json({error:'다른 창에서 수정된 작업입니다. 목록을 새로고침한 뒤 다시 수정해 주세요.'},409);
    return json(serialize(rows[0]));
  } catch {return json({error:'저장하지 못했습니다. 입력 내용은 유지됩니다.'},503);}
}
