import Admin from '@/components/Admin';
import {configured} from '@/lib/supabase';
export const metadata={title:'작업 관리',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
// Allow the first Google sign-in before assigning an administrator ID.
// Every admin API still requires authorize(), including the ADMIN_USER_ID check.
export default function AdminPage(){return <main id="main" className="shell admin"><Admin ready={configured()}/></main>;}
