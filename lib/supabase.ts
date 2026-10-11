import 'server-only';
import {createClient} from '@supabase/supabase-js';
import {NextRequest} from 'next/server';
import {COOKIE_NAME,verifySession} from './admin-session';
export const configured=()=>!!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export function service(){if(!configured())throw new Error('저장소 연결 설정이 필요합니다.');return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});}
export async function authorize(req:Request){
 if(!configured())return null;
 const token=new NextRequest(req).cookies.get(COOKIE_NAME)?.value;
 return verifySession(token,process.env.ADMIN_PASSWORD,process.env.SUPABASE_SERVICE_ROLE_KEY)?service():null;
}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !!origin && origin===new URL(req.url).origin;}
