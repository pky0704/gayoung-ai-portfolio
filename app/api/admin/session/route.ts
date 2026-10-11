import {NextRequest,NextResponse} from 'next/server';
import {authorize,configured,sameOrigin,service} from '@/lib/supabase';
import {COOKIE_NAME,SESSION_SECONDS,issueSession,passwordMatches,passwordReady} from '@/lib/admin-session';
export const runtime='nodejs';
const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict' as const,path:'/'};
export async function GET(req:Request){return NextResponse.json({signedIn:!!await authorize(req)},{headers:{'Cache-Control':'no-store'}});}
export async function POST(req:NextRequest){
 if(!sameOrigin(req))return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403});
 const password=process.env.ADMIN_PASSWORD;
 if(!configured()||!passwordReady(password))return NextResponse.json({error:'관리자 비밀번호 설정을 마친 뒤 이용해 주세요.'},{status:503});
 if(Number(req.headers.get('content-length')||0)>2048)return NextResponse.json({error:'입력 길이를 확인해 주세요.'},{status:413});
 // Database-backed atomic budget: shared across all serverless instances.
 // A global budget also prevents rotating IP addresses from bypassing the limit.
 const {data:permitted,error}=await service().rpc('take_admin_login_attempt');
 if(error)return NextResponse.json({error:'로그인 연결을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'},{status:503});
 if(permitted!==true)return NextResponse.json({error:'로그인 시도가 많습니다. 5분 뒤 다시 시도해 주세요.'},{status:429,headers:{'Retry-After':'300'}});
 let input;try{input=await req.json();}catch{return NextResponse.json({error:'입력 형식을 확인해 주세요.'},{status:400});}
 if(typeof input?.password!=='string'||input.password.length>256||!passwordMatches(input.password,password!))return NextResponse.json({error:'비밀번호를 확인해 주세요.'},{status:401});
 const res=NextResponse.json({signedIn:true});
 res.cookies.set(COOKIE_NAME,issueSession(password!,process.env.SUPABASE_SERVICE_ROLE_KEY!),{...cookieOptions,maxAge:SESSION_SECONDS});
 return res;
}
export async function DELETE(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403});
 const res=NextResponse.json({signedIn:false});res.cookies.set(COOKIE_NAME,'',{...cookieOptions,maxAge:0});return res;
}
