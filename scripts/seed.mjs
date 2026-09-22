import {readFile} from 'node:fs/promises';
import {createClient} from '@supabase/supabase-js';
for(const key of ['NEXT_PUBLIC_SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY'])if(!process.env[key])throw new Error(`Missing ${key}`);
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
const rows=JSON.parse(await readFile(new URL('../data/projects.json',import.meta.url),'utf8')).map(({updated_at,...p})=>p);
const {error}=await db.from('projects').upsert(rows,{onConflict:'id',ignoreDuplicates:true});
if(error)throw error;
console.log('초기 5개 프로젝트 등록 완료. 기존에 수정한 데이터는 덮어쓰지 않았습니다.');
