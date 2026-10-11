import {NextResponse} from 'next/server';
import {authorize,sameOrigin} from '@/lib/supabase';
import {workSchema,type Work} from '@/lib/work-schema';
import type {SupabaseClient} from '@supabase/supabase-js';
const headers={'Cache-Control':'private, no-store'};
async function render(db:SupabaseClient,rows:Work[]){
 const paths=[...new Set(rows.flatMap(w=>[w.thumbnail,w.poster]).filter(x=>x.startsWith('uploads/')))];
 const signed=new Map<string,string>();
 if(paths.length){const {data,error}=await db.storage.from('project-assets').createSignedUrls(paths,3600);if(error)throw error;for(const x of data??[])if(x.path&&x.signedUrl)signed.set(x.path,x.signedUrl);}
 return rows.map(w=>({...w,thumbnailSrc:w.thumbnail.startsWith('/')?w.thumbnail:signed.get(w.thumbnail)||'',posterSrc:w.poster.startsWith('/')?w.poster:signed.get(w.poster)||''}));
}
export async function GET(req:Request){
 const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401,headers});
 const {data,error}=await db.from('work_items').select('*').order('name');
 if(error)return NextResponse.json({error:'작업 저장소 연결이 필요합니다. work_items 테이블 설정을 확인해 주세요.'},{status:503,headers});
 try{return NextResponse.json(await render(db,data as Work[]),{headers});}catch{return NextResponse.json({error:'작업 이미지를 불러오지 못했습니다.'},{status:503,headers});}
}
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403,headers});
 const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401,headers});
 const body=await req.text();if(body.length>100000)return NextResponse.json({error:'입력 내용이 너무 큽니다.'},{status:413,headers});
 let raw;try{raw=JSON.parse(body);}catch{return NextResponse.json({error:'입력 형식을 확인해 주세요.'},{status:400,headers});}
 const parsed=workSchema.safeParse(raw);if(!parsed.success)return NextResponse.json({error:parsed.error.issues.map(i=>i.message).join('\n')},{status:400,headers});
 const {updated_at,...value}=parsed.data;const now=new Date().toISOString();
 const result=updated_at?await db.from('work_items').update({...value,updated_at:now}).eq('id',value.id).eq('updated_at',updated_at).select().maybeSingle():await db.from('work_items').insert({...value,updated_at:now}).select().single();
 if(result.error||!result.data)return NextResponse.json({error:result.error?.code==='42P01'?'작업 저장소 연결이 필요합니다.':'저장하지 못했습니다. 다른 창에서 변경되었을 수 있습니다. 입력 내용을 보관한 뒤 목록을 새로 불러와 주세요.'},{status:409,headers});
 // A successful write must stay successful even if a signed image URL cannot be refreshed.
 const saved=result.data as Work;
 try{return NextResponse.json((await render(db,[saved]))[0],{headers});}catch{return NextResponse.json({...saved,thumbnailSrc:'',posterSrc:''},{headers});}
}
