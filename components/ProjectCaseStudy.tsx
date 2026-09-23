import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';
import type {ViewProject} from '@/lib/schema';
import type {CaseStudy} from '@/lib/case-studies';
import dimensions from '@/lib/case-study-images.json';
import Back from './Back';
import ProjectExample from './ProjectExample';
import s from './ProjectCaseStudy.module.css';
function Title({lines}:{lines:[string,string]}){return <>{lines[0]}<br/>{lines[1]}</>;}
function Chapter({number,label,title,children}:{number:string;label:string;title:[string,string];children?:ReactNode}){return <div className={s.chapter}><p className={s.eyebrow}><span>{number}</span> {label}</p><h2><Title lines={title}/></h2>{children&&<p className={s.intro}>{children}</p>}</div>;}
export default function ProjectCaseStudy({project:p,study:c,nextProject}:{project:ViewProject;study:CaseStudy;nextProject?:ViewProject}){
 const asset='/case-study/'+p.slug+'/';const size=dimensions[p.slug as keyof typeof dimensions];
 return <main id="main" className={`${s.page} ${s[c.theme]}`}>
  <div className={s.container}>
   <div className={s.back}><Back slug={p.slug}/><span>매장에서 시작한 디지털 실험</span></div>
   <section className={s.hero} aria-labelledby="case-title"><p className={s.eyebrow}>{c.eyebrow}</p><div className={s.heroHeading}><h1 id="case-title">{c.headline[0]}<br/><em>{c.headline[1]}</em></h1><div className={s.heroCopy}><p>{p.title}</p><p>{c.lead}</p><a className={s.cta} href={p.url} target="_blank" rel="noopener noreferrer">{c.cta} ↗</a></div></div><div className={s.metadata}><span>{c.audience}</span><span>웹 프로토타입</span><span>{p.status}</span></div></section>
  </div>
  <section className={s.showcase} aria-label={`${p.title} PC와 모바일 화면`}><div className={s.container}><div className={s.showcaseLabel}><span>THE SERVICE, AT A GLANCE</span><span>{p.title}</span></div><div className={s.devices}><figure className={s.desktop}><div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>{p.title}</span><span aria-hidden="true">↗</span></div><Image src={asset+'desktop.webp'} alt={`${p.title} 실제 공개 사이트 첫 화면`} {...size.desktop} priority sizes="(max-width: 700px) 92vw, 800px"/><figcaption>PC · 실제 공개 화면</figcaption></figure><figure className={s.phone}><div className={s.phoneFrame}><iframe src={p.url} title={`${p.title} 모바일 화면 체험`} loading="lazy" sandbox="allow-scripts allow-same-origin" referrerPolicy="strict-origin-when-cross-origin"/></div><figcaption>모바일 · 실제 사이트<br/>화면 안에서 스크롤해 보세요.</figcaption></figure></div></div></section>
  <nav className={s.sectionNav} aria-label="제작 이야기 목차"><div className={s.container}><a href="#case-why">만든 이유</a><a href="#case-design">화면 설계</a><a href="#case-guide">사용 방법</a><a href="#case-making">제작 과정</a></div></nav>
  <div className={s.container}>
   <section id="case-why" className={s.section}><Chapter number="01" label="BACKGROUND" title={c.contextTitle}>{p.problem}</Chapter><div className={s.contextGrid}><figure className={s.contextPhoto}><Image src={asset+'context.webp'} alt={c.photoAlt} {...size.context} sizes="(max-width: 700px) 92vw, 560px"/><figcaption>이용 상황을 설명하는 참고 이미지 · 실제 매장 사진이 아닙니다.</figcaption></figure><div className={s.problems}>{c.problems.map((x,i)=><article key={x.title}><span>0{i+1}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></div><blockquote className={s.insight}><span>이번 프로젝트의 질문</span><p>{c.question}</p></blockquote></section>
   <section className={s.section}><Chapter number="02" label="THE APPROACH" title={['현장의 불편을,','화면의 역할로 바꾸기.']}/><div className={s.solutions}>{c.solutions.map(x=><article key={x.title}><div className={s.solutionGraphic}><span>{x.before}</span><b aria-hidden="true">→</b><strong>{x.after}</strong></div><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></section>
   <section id="case-design" className={s.section}><Chapter number="03" label="SCREEN DESIGN" title={c.screenTitle}>{c.screenIntro}</Chapter><div className={s.featureLayout}><figure className={s.featureScreen}><Image src={asset+'feature.webp'} alt={c.screenNote} {...size.feature} sizes="(max-width: 700px) 88vw, 560px"/><figcaption>{c.screenNote}</figcaption></figure><div className={s.featureNotes}>{c.features.map((x,i)=><article key={x.title}><span>{i+1}</span><div><h3>{x.title}</h3><p>{x.text}</p></div></article>)}<div className={s.principle}><span className={s.eyebrow}>DESIGN LANGUAGE</span><p><i aria-hidden="true"/>선택할 행동은 눈에 띄게.<br/>읽어야 할 정보는 차분하게.</p></div></div></div></section>
   <section id="case-guide" className={s.section}><Chapter number="04" label="HOW TO USE" title={p.slug==='voice-recipe'?['현재 확인할 수 있는 화면과,','그다음에 계획한 흐름.']:['처음 보는 사람도,','이 순서로 시작해요.']}>{c.guideIntro}</Chapter><ol className={s.steps}>{c.steps.map((x,i)=><li key={x.title}><span>0{i+1}</span><h3>{x.title}</h3><p>{x.text}</p><div className={s.stepBadge}>{x.badge}</div></li>)}</ol></section>
   <section className={s.section}><Chapter number="05" label="A CLOSER LOOK" title={c.exampleTitle}>아래 예시를 눌러 입력과 결과의 구성을 살펴보세요.</Chapter><ProjectExample examples={c.examples}/></section>
  </div>
  <section id="case-making" className={s.making}><div className={s.container}><Chapter number="06" label="BEHIND THE SCREENS" title={['현장의 질문에서 시작해,','작동하는 화면으로.']}>프로젝트의 출발점과 현재 구성, 다음에 확인할 일을 함께 정리했습니다.</Chapter><ol className={s.timeline}>{c.process.map((x,i)=><li key={x.title}><span>0{i+1}</span><div><b>{x.status}</b><h3>{x.title}</h3><p>{x.text}</p></div></li>)}</ol><div className={s.lesson}><span>이 프로젝트에서 중요하게 보는 것</span><p>{c.lesson}</p></div></div></section>
  <div className={s.container}>
   <section className={s.section}><Chapter number="07" label="WHERE WE ARE" title={['지금 볼 수 있는 것.','다음으로 연결할 것.']}/><div className={s.scopeGrid}><div><h3>현재 공개된 범위</h3><ul>{c.available.map(x=><li key={x}>{x}</li>)}</ul><p>{p.scope}</p></div><div><h3>다음 개선 방향</h3><ul>{c.next.map(x=><li key={x}>{x}</li>)}</ul>{p.next&&<p>{p.next}</p>}</div></div></section>
   <section className={s.ending}><p className={s.eyebrow}>SMALL SHOP, REAL EXPERIMENTS</p><h2><Title lines={c.closing}/></h2><a className={s.cta} href={p.url} target="_blank" rel="noopener noreferrer">{c.cta} ↗</a><p>{p.status}</p></section>
   {nextProject&&<Link className={s.nextProject} href={'/projects/'+nextProject.slug}><span>다음 제작 이야기</span><strong>{nextProject.title} →</strong></Link>}
   <div className={s.credits}><p>사진: <a href={c.photoUrl} target="_blank" rel="noopener noreferrer">{c.photoAuthor} / Unsplash ↗</a> · 상황을 설명하는 참고 이미지입니다.</p><p>PC·확대 화면: 실제 공개 사이트 캡처 · 모바일: 실제 사이트 임베드 · 화면 확인: 2026. 09. 24.</p><Back slug={p.slug}/></div>
  </div>
 </main>;
}
