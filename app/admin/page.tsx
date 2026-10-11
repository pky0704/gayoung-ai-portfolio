import Admin from '@/components/Admin';
import {configured} from '@/lib/supabase';
import {passwordReady} from '@/lib/admin-session';
export const metadata={title:'작업 관리',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default function AdminPage(){
 const password=process.env.ADMIN_PASSWORD;
 const setupMessage=!configured()?'데이터 저장소 연결 설정이 필요합니다.':!password?'관리자 비밀번호가 운영 환경에 등록되지 않았습니다.':!passwordReady(password)?'관리자 비밀번호는 12~256자로 저장해 주세요. 변경 후 재배포하면 로그인할 수 있습니다.':'';
 return <main id="main" className="shell admin"><Admin ready={!setupMessage} setupMessage={setupMessage}/></main>;
}
