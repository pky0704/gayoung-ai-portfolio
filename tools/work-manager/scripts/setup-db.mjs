import postgres from 'postgres';
import {readFile} from 'node:fs/promises';
if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL을 설정해 주세요.');
const sql=postgres(process.env.DATABASE_URL,{max:1,prepare:false});
try{
 await sql.begin(async tx=>{
  await tx`CREATE TABLE IF NOT EXISTS work_items (id text PRIMARY KEY, data jsonb NOT NULL, archived boolean NOT NULL DEFAULT false,revision integer NOT NULL DEFAULT 1,updated_at timestamptz NOT NULL DEFAULT NOW())`;
  await tx`CREATE TABLE IF NOT EXISTS work_assets (id text PRIMARY KEY,mime text NOT NULL CHECK (mime IN ('image/png','image/jpeg','image/webp')),bytes_base64 text NOT NULL,created_at timestamptz NOT NULL DEFAULT NOW())`;
  const works=JSON.parse(await readFile('seed/works.json','utf8'));
  for(const work of works){
    const {id,revision,archived,updatedAt,...data}=work;
    await tx`INSERT INTO work_items (id,data) VALUES (${id},${JSON.stringify(data)}::jsonb) ON CONFLICT (id) DO NOTHING`;
    if(data.thumbnailId){const bytes=(await readFile('seed/images/'+data.thumbnailId+'.png')).toString('base64');await tx`INSERT INTO work_assets (id,mime,bytes_base64) VALUES (${data.thumbnailId},'image/png',${bytes}) ON CONFLICT (id) DO NOTHING`;}
  }
 });console.log('작업 관리함 전용 테이블과 최초 목록을 준비했습니다. 기존 항목은 덮어쓰지 않았습니다.');
}finally{await sql.end();}
