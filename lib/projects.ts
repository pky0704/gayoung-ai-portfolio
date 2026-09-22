import 'server-only';
import {cache} from 'react';
import seed from '@/data/projects.json';
import {configured,service} from './supabase';
import type {Project,ViewProject} from './schema';
export async function renderProjects(rows:Project[]):Promise<ViewProject[]>{
 const paths=[...new Set(rows.flatMap(p=>[p.cover,...p.screenshots]).filter(x=>x.startsWith('uploads/')))];
 const signed=new Map<string,string>();
 if(paths.length){const {data,error}=await service().storage.from('project-assets').createSignedUrls(paths,3600);if(error)throw error;for(const row of data??[])if(row.path&&row.signedUrl)signed.set(row.path,row.signedUrl);}
 const src=(s:string)=>s.startsWith('/')?s:signed.get(s)??'';
 return rows.map(p=>({...p,coverSrc:src(p.cover),screenshotSrcs:p.screenshots.map(src)}));
}
export const publicProjects=cache(async function publicProjects(){
 if(!configured())return renderProjects(seed as Project[]);
 const {data,error}=await service().from('projects').select('*').eq('visibility','published').order('sort_order').order('title');
 if(error)throw new Error('프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
 return renderProjects(data as Project[]);
});
