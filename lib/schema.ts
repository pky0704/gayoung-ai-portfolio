import {z} from 'zod';
export const asset = z.string().max(1000).refine(v => /^\/(covers|captures)\/[a-zA-Z0-9._-]+$/.test(v) || /^uploads\/[0-9a-f-]{36}\.webp$/.test(v), '올바른 이미지 파일을 선택해 주세요.');
export const projectSchema = z.object({
 id:z.uuid(),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
 title:z.string().trim().min(1).max(120),summary:z.string().trim().min(1).max(300),
 url:z.url().refine(v=>new URL(v).protocol==='https:','https 주소를 입력해 주세요.'),
 category:z.string().max(100),status:z.string().max(150),cover:z.union([asset,z.literal('')]),
 screenshots:z.array(asset).max(12),capture_note:z.string().max(200),captured_at:z.string().max(80),
 problem:z.string().max(5000),steps:z.string().max(5000),process:z.string().max(5000),scope:z.string().max(5000),next:z.string().max(5000),
 visibility:z.enum(['draft','published','hidden','trash']),sort_order:z.number().int().min(0).max(100000),updated_at:z.string().nullable()
}).superRefine((p,ctx)=>{if(p.visibility==='published' && (!p.cover || !p.screenshots.length || !p.problem.trim() || !p.scope.trim()))ctx.addIssue({code:'custom',message:'공개하려면 커버, 실제 캡처, 만든 이유, 구현 범위를 입력해 주세요.'});});
export type Project=z.infer<typeof projectSchema>;
export type ViewProject=Project & {coverSrc:string;screenshotSrcs:string[]};
