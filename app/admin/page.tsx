import Admin from '@/components/Admin';
import {configured} from '@/lib/supabase';
import {passwordReady} from '@/lib/admin-session';
export const metadata={title:'작업 관리',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default function AdminPage(){return <main id="main" className="shell admin"><Admin ready={configured()&&passwordReady(process.env.ADMIN_PASSWORD)}/></main>;}
