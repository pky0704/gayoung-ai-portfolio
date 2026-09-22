import Admin from '@/components/Admin';
import {configured} from '@/lib/supabase';
export const metadata={title:'프로젝트 관리',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default function AdminPage(){return <main id="main" className="shell admin"><Admin ready={configured()&&!!process.env.ADMIN_USER_ID}/></main>;}
