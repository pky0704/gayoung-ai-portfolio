import Link from 'next/link';
import Image from 'next/image';
import type {ViewProject} from '@/lib/schema';
import SchoolTag from './SchoolTag';
import {updates} from '@/lib/portfolio';
import {projectCopy} from '@/lib/editorial';
export default function Card({p,index}:{p:ViewProject;index:number}) {
 const update=updates[p.slug];const copy=projectCopy[p.slug]??p;
 return <article className="project" id={p.slug}>
  <Link className="cover-link" href={`/projects/${p.slug}`} aria-label={`${copy.title} 만든 과정 보기`}><Image className="cover" src={p.coverSrc} width={1200} height={720} alt={`${copy.title} 소개 이미지`} priority={index<3}/></Link>
  <div className="project-body"><div className="card-tag-slot"><SchoolTag slug={p.slug}/></div><div className="project-meta"><span>{p.category}</span><span>{String(index+1).padStart(2,'0')}</span></div><h3><Link href={`/projects/${p.slug}`}>{copy.title}</Link></h3><p className="card-summary">{copy.summary}</p><p className="status"><span aria-hidden="true">●</span> {update?.status??p.status}</p><div className="card-links"><Link href={`/projects/${p.slug}`}>만든 과정 <span aria-hidden="true">→</span></Link><a href={update?.url??p.url} target="_blank" rel="noopener noreferrer">사이트 열기 <span aria-hidden="true">↗</span></a></div></div>
 </article>;
}
