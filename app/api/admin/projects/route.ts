import {withEditorialProjects,editorialProjects} from '@/lib/project-catalog';
import {z} from 'zod';
import {NextResponse} from 'next/server';
import {authorize,sameOrigin} from '@/lib/supabase';
import {projectSchema,type Project} from '@/lib/schema';
import {renderProjects} from '@/lib/projects';
export async function GET(req:Request){const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401});const {data,error}=await db.from('projects').select('*').order('sort_order').order('title');if(error)return NextResponse.json({error:'목록을 불러오지 못했습니다.'},{status:503});return NextResponse.json(await renderProjects(withEditorialProjects(data as Project[])),{headers:{'Cache-Control':'no-store'}});}
export async function POST(req:Request){if(!sameOrigin(req))return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403});const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401});
 let input;try{input=await req.json();}catch{return NextResponse.json({error:'입력 형식을 확인해 주세요.'},{status:400});}
 const parsed=projectSchema.safeParse(input);if(!parsed.success)return NextResponse.json({error:parsed.error.issues.map(i=>i.message).join('\n')},{status:400});
 const p=parsed.data;const {updated_at,...rest}=p;const now=new Date().toISOString();
 const result=updated_at?await db.from('projects').update({...rest,updated_at:now}).eq('id',p.id).eq('updated_at',updated_at).select().maybeSingle():await db.from('projects').insert({...rest,updated_at:now}).select().single();
 if(result.error)return NextResponse.json({error:result.error.code==='23505'?'같은 상세 주소가 이미 있습니다. 다른 주소를 입력해 주세요.':'저장하지 못했습니다. 입력 내용은 유지됩니다.'},{status:409});
 if(!result.data)return NextResponse.json({error:'다른 창에서 수정된 기록입니다. 입력 내용을 복사한 뒤 목록을 새로 불러와 주세요.'},{status:409});
 return NextResponse.json((await renderProjects([result.data as Project]))[0]);
}

// Visibility changes are deliberately separate from editing portfolio content.
export async function PATCH(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403});
 const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401});
 let body;try{body=await req.json();}catch{return NextResponse.json({error:'입력 형식을 확인해 주세요.'},{status:400});}
 const parsed=z.object({id:z.uuid(),visibility:z.enum(['published','hidden']),updated_at:z.string().nullable()}).safeParse(body);
 if(!parsed.success)return NextResponse.json({error:'공개 상태를 확인해 주세요.'},{status:400});
 const {id,visibility,updated_at}=parsed.data;
 const current=await db.from('projects').select('*').eq('id',id).maybeSingle();
 if(current.error)return NextResponse.json({error:'현재 공개 상태를 확인하지 못했습니다.'},{status:503});
 const p=current.data as Project|null;
 if(p&&(p.updated_at!==updated_at||!['published','hidden'].includes(p.visibility)))return NextResponse.json({error:'기록이 변경되었거나 공개 준비가 필요합니다. 목록을 새로 불러온 뒤 게시 관리에서 확인해 주세요.'},{status:409});
 const editorial=editorialProjects.find(p=>p.id===id);
 if(!p&&!editorial)return NextResponse.json({error:'프로젝트를 찾지 못했습니다.'},{status:404});
 const stamp=new Date().toISOString();
 let query=db.from('projects').update({visibility,updated_at:stamp}).eq('id',id);
 query=updated_at?query.eq('updated_at',updated_at):query.is('updated_at',null);
 const result=p?await query.select().maybeSingle():await db.from('projects').insert({...editorial!,visibility,updated_at:stamp}).select().single();
 if(result.error||!result.data)return NextResponse.json({error:'저장하지 못했습니다. 목록을 새로 불러온 뒤 다시 시도해 주세요.'},{status:409});
 return NextResponse.json((await renderProjects([result.data as Project]))[0],{headers:{'Cache-Control':'no-store'}});
}
