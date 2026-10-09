'use client';
import {useState,type ReactNode} from 'react';
type Entry={slug:string;school:boolean;progress:boolean;card:ReactNode};
export default function ProjectGallery({entries,initialFilter}:{entries:Entry[];initialFilter:'all'|'school'}){
 const [filter,setFilter]=useState<'all'|'school'|'progress'>(initialFilter);
 const shown=entries.filter(e=>filter==='all'||(filter==='school'?e.school:e.progress));
 return <><div className="gallery-controls"><div className="gallery-filters" role="group" aria-label="프로젝트 분류">{([{id:'all',name:'전체'},{id:'school',name:'AI 장사스쿨 참여 중 제작'},{id:'progress',name:'제작 중'}] as const).map(f=><button key={f.id} className={f.id==='school'?'school-filter':''} aria-pressed={filter===f.id} onClick={()=>setFilter(f.id)}>{f.name}<span>{entries.filter(e=>f.id==='all'||(f.id==='school'?e.school:e.progress)).length}</span></button>)}</div><p aria-live="polite">{shown.length}개 프로젝트</p></div><div className="project-grid">{shown.map(e=><div key={e.slug}>{e.card}</div>)}</div>{!shown.length&&<p>이 분류의 기록을 준비하고 있습니다.</p>}</>;
}
