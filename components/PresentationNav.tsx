import Link from 'next/link';
import {presentationOrder,recentWorks} from '@/lib/portfolio';
const names:Record<string,string>={'menu-finder':'외국인 메뉴 도우미','online-prepay':'온라인 선결제',...Object.fromEntries(recentWorks.map(w=>[w.slug,w.title]))};
export default function PresentationNav({slug}:{slug:string}){const i=presentationOrder.indexOf(slug);if(i<0)return null;const previous=presentationOrder[i-1];const next=presentationOrder[i+1];return <nav className="presentation-nav" aria-label="발표 순서 이동"><span>{i+1} / {presentationOrder.length}</span>{previous&&<Link href={'/projects/'+previous}>← {names[previous]}</Link>}<Link href="/ai-school#school-story">발표 목차</Link>{next?<Link href={'/projects/'+next}>{names[next]} →</Link>:<Link href="/ai-school#reflection">변화와 다음 목표 →</Link>}</nav>}
