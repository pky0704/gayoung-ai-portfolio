import Link from 'next/link';
import Card from '@/components/Card';
import ProjectGallery from '@/components/ProjectGallery';
import {RecentWorkCard} from '@/components/RecentWork';
import {recentWorks,schoolSlugs} from '@/lib/portfolio';
import {publicProjects} from '@/lib/projects';
export const dynamic='force-dynamic';
export default async function Home({searchParams}:{searchParams:Promise<{tag?:string}>}) {
 const [projects,query]=await Promise.all([publicProjects(),searchParams]);
 const additions=recentWorks.filter(w=>!projects.some(p=>p.slug===w.slug));
 const entries=[...projects.map((p,i)=>({slug:p.slug,school:schoolSlugs.includes(p.slug),progress:false,card:<Card p={p} index={i}/> })),...additions.map((w,i)=>({slug:w.slug,school:schoolSlugs.includes(w.slug),progress:!w.url,card:<RecentWorkCard work={w} index={projects.length+i}/> }))];
 return <main id="main">
  <section className="hero shell home-intro">
   <p className="eyebrow"><span className="orange-dot"/>가영이네 사장 박가영의 포트폴리오</p>
   <h1>매장에 필요한 <span>사이트</span>를<br/>AI와 함께 만듭니다.</h1>
   <div className="hero-bottom"><p>선결제 신청부터 메뉴 안내, 홍보물 준비까지.<br/>직접 만든 사이트와 매장에서 활용한 과정을 소개합니다.</p><Link className="school-entry" href="/ai-school">AI 장사스쿨 참여·발표 보기 <span aria-hidden="true">↗</span></Link></div>
  </section>
  <section id="projects" className="shell projects-section"><div className="section-heading"><div><h2>내가 만든 사이트<span>.</span></h2><p className="section-description">사용할 수 있는 사이트와 만들고 있는 프로젝트를 모았습니다.</p></div><span className="project-count">전체 {entries.length}개</span></div><ProjectGallery key={query.tag??'all'} entries={entries} initialFilter={query.tag==='school'?'school':'all'}/></section>
  <section id="about" className="about"><div className="shell about-grid"><div><p className="eyebrow">만든 사람</p><h2>가영이네 사장,<br/>박가영입니다.</h2></div><div className="about-copy"><p>엄마와 함께 분식집을 운영합니다.</p><p>반복해서 설명하고 기록하는 일을 줄이고 싶어 AI와 함께 사이트를 만들기 시작했습니다.</p><p>완성한 결과뿐 아니라 실제로 사용하며 고친 과정도 이곳에 남깁니다.</p><a className="text-link" href="https://www.instagram.com/gayoung.ai.note/" target="_blank" rel="noopener noreferrer">인스타그램에서 일상 기록 보기 ↗</a></div></div></section>
 </main>;
}
