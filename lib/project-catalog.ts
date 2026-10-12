import {recentWorks} from './portfolio.ts';
import {shareImage} from './share-images.ts';
import type {Project} from './schema.ts';
export const editorialProjects:Project[]=recentWorks.map((w,i)=>({
 id:`00000000-0000-4000-8000-${String(101+i).padStart(12,'0')}`,slug:w.slug,title:w.title,summary:w.summary,
 url:w.url||`https://gayoungai.vercel.app/projects/${w.slug}`,category:w.category,status:w.status,
 cover:shareImage(w.slug),screenshots:[],capture_note:'',captured_at:'',problem:w.problem,steps:w.steps.join('\n'),process:w.process,scope:w.current.join('\n'),next:w.next.join('\n'),
 visibility:'published',sort_order:100+i,updated_at:null
}));
export function withEditorialProjects(rows:Project[]){return [...rows,...editorialProjects.filter(p=>!rows.some(r=>r.slug===p.slug))];}
