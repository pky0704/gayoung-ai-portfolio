import 'server-only';
import {createClient} from '@supabase/supabase-js';
export const configured=()=>!!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY);
export function service(){if(!configured())throw new Error('저장소 연결 설정이 필요합니다.');return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});}
export async function authorize(req:Request){
 const token=req.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
 if(!token || !configured() || !process.env.ADMIN_USER_ID) return null;
 const db=service(); const {data,error}=await db.auth.getUser(token);
 if(error || !data.user || data.user.id!==process.env.ADMIN_USER_ID || data.user.app_metadata.provider!=='google')return null;
 return db;
}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !!origin && origin===new URL(req.url).origin;}
