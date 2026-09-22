import {NextResponse} from 'next/server';
import {authorize,sameOrigin} from '@/lib/supabase';
import {projectSchema,type Project} from '@/lib/schema';
import {renderProjects} from '@/lib/projects';
export async function GET(req:Request){const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401});const {data,error}=await db.from('projects').select('*').order('sort_order').order('title');if(error)return NextResponse.json({error:'목록을 불러오지 못했습니다.'},{status:503});return NextResponse.json(await renderProjects(data as Project[]),{headers:{'Cache-Control':'no-store'}});}
export async function POST(req:Request){if(!sameOrigin(req))return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403});const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401});
 let input;try{input=await req.json();}catch{return NextResponse.json({error:'입력 형식을 확인해 주세요.'},{status:400});}
 const parsed=projectSchema.safeParse(input);if(!parsed.success)return NextResponse.json({error:parsed.error.issues.map(i=>i.message).join('\n')},{status:400});
 const p=parsed.data;const {updated_at,...rest}=p;const now=new Date().toISOString();
 const result=updated_at?await db.from('projects').update({...rest,updated_at:now}).eq('id',p.id).eq('updated_at',updated_at).select().maybeSingle():await db.from('projects').insert({...rest,updated_at:now}).select().single();
 if(result.error)return NextResponse.json({error:result.error.code==='23505'?'같은 상세 주소가 이미 있습니다. 다른 주소를 입력해 주세요.':'저장하지 못했습니다. 입력 내용은 유지됩니다.'},{status:409});
 if(!result.data)return NextResponse.json({error:'다른 창에서 수정된 기록입니다. 입력 내용을 복사한 뒤 목록을 새로 불러와 주세요.'},{status:409});
 return NextResponse.json((await renderProjects([result.data as Project]))[0]);
}
