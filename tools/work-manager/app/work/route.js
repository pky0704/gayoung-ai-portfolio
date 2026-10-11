import {readFile} from 'node:fs/promises';
import {auth} from '../../auth.js';
export const dynamic='force-dynamic';
export async function GET(request) {
  if(!process.env.AUTH_SECRET || !(await auth())?.isAdmin) return Response.redirect(new URL('/',request.url),303);
  const html=await readFile(process.cwd()+'/ui/index.html','utf8');
  return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"}});
}
