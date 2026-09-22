import Link from 'next/link';
import Image from 'next/image';
import type {ViewProject} from '@/lib/schema';
import Capture from './Capture';
export default function Card({p,index}:{p:ViewProject;index:number}){return <article className="project" id={p.slug}><Link className="cover-link" href={`/projects/${p.slug}`} aria-label={`${p.title} 상세보기`}><Image className="cover" src={p.coverSrc} width={1200} height={720} alt={`${p.title} 디자인 커버`} priority={index<2}/></Link><Capture src={p.screenshotSrcs[0]} title={p.title} note={p.capture_note} url={p.url}/><div className="project-meta"><span>{p.category}</span><span>{String(index+1).padStart(2,'0')}</span></div><h3><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3><p>{p.summary}</p><p className="status"><span aria-hidden>●</span> {p.status}</p><div className="card-links"><Link href={`/projects/${p.slug}`}>제작 이야기 <span>→</span></Link><a href={p.url} target="_blank" rel="noopener noreferrer">실제 사이트 보기 <span>↗</span></a></div></article>;}
