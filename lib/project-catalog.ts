import {recentWorks} from './portfolio.ts';
import {shareImage} from './share-images.ts';
import type {Project} from './schema.ts';
export const editorialProjects:Project[]=recentWorks.map((w,i)=>({
 id:`00000000-0000-4000-8000-${String(101+i).padStart(12,'0')}`,slug:w.slug,title:w.title,summary:w.summary,
 url:w.url||`https://gayoungai.vercel.app/projects/${w.slug}`,category:w.category,status:w.status,
 cover:shareImage(w.slug),screenshots:[],capture_note:'',captured_at:'',problem:w.problem,steps:w.steps.join('\n'),process:w.process,scope:w.current.join('\n'),next:w.next.join('\n'),
 visibility:'published',sort_order:100+i,updated_at:null
}));
const menuInterview = {"url": "https://gayoungene-menu-finder.vercel.app/", "status": "매장 적용 준비 중 · 고객 사용 전", "summary": "반복되는 재료·맵기 질문을 고객이 직접 확인하고, 방문과 주문도 준비하도록 만들었습니다.", "problem": "외국인 고객의 재방문과 귀국 전 포장에서 새로운 고객층의 가능성을 보았습니다. 어머니와 둘이 운영하는 매장에서 반복되는 재료·맵기 질문을 줄이고, 고객이 기다리지 않고 메뉴를 확인하도록 만들었습니다.", "process": "AI가 제작을 도와줘도 실제 원재료 정보는 직접 확인해야 했습니다. 무엇을 안내하고 매장에서 어떻게 쓰게 할지 결정하는 일에는 운영자의 경험이 필요했습니다.", "scope": "메뉴 정보와 방문·주문 안내를 제작했습니다. 현재 실제 고객 사용 전이며 QR 안내물 배치를 준비하고 있습니다. 응대 부담 감소와 방문 유도는 검증 전인 목표입니다.", "next": "QR 안내물 배치 후 실제 고객의 사용 모습과 반복 질문의 변화를 확인할 계획입니다."};
export function withEditorialProjects(rows:Project[]){return [...rows.map(p=>p.slug==='menu-finder'?{...p,url:menuInterview.url,status:menuInterview.status,summary:menuInterview.summary,problem:menuInterview.problem,process:menuInterview.process,scope:menuInterview.scope,next:menuInterview.next}:p.slug==='online-prepay'?{...p,url:'https://gayoungene-prepay.vercel.app/demo.html'}:p),...editorialProjects.filter(p=>!rows.some(r=>r.slug===p.slug))];}
