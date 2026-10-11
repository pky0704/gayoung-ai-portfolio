import {z} from 'zod';
import type {ViewProject} from './schema.ts';
export const stages=['미확인','개발 중','개발 완료','개발 종료'] as const;
export const usages=['미확인','사용 중','테스트 중','사용 안 함'] as const;
const link=z.string().max(2000).refine(v=>{if(!v)return true;try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}},'https 주소를 입력해 주세요.');
const image=z.string().max(1000).refine(v=>!v||/^\/(covers|captures)\/[a-zA-Z0-9._-]+$/.test(v)||/^uploads\/[0-9a-f-]{36}\.webp$/.test(v),'올바른 이미지 파일을 선택해 주세요.');
export const workSchema=z.object({
 id:z.uuid(),type:z.enum(['site','prompt']),name:z.string().trim().min(1).max(120),description:z.string().max(1000),
 url:link,adminUrl:link,stage:z.enum(stages),usage:z.enum(usages),
 createdDate:z.string().refine(v=>!v||(/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v),'날짜를 확인해 주세요.'),
 thumbnail:z.union([image,z.literal('')]),poster:z.union([image,z.literal('')]),
 prompt:z.string().max(30000),notes:z.string().max(10000),archived:z.boolean(),
 updated_at:z.iso.datetime({offset:true}).nullable()
});
export type Work=z.infer<typeof workSchema>;
export type ViewWork=Work & {thumbnailSrc:string;posterSrc:string};
export function fromProject(p:ViewProject):ViewWork{return {id:p.id,type:'site',name:p.title,description:p.summary,url:p.url,adminUrl:'',stage:'미확인',usage:'미확인',createdDate:'',thumbnail:p.cover,poster:'',prompt:'',notes:'',archived:false,updated_at:null,thumbnailSrc:p.coverSrc,posterSrc:''};}
export function mergeWorks(projects:ViewProject[],works:ViewWork[]):ViewWork[]{const records=new Map(projects.filter(p=>p.visibility==='published').map(p=>[p.id,fromProject(p)]));for(const w of works)records.set(w.id,w);return [...records.values()];}
