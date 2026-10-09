import type {Metadata} from 'next';
import Link from 'next/link';
import SchoolStory,{Reflection} from '@/components/SchoolStory';
import {publicProjects} from '@/lib/projects';
import {recentWorks} from '@/lib/portfolio';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'AI 장사스쿨 참여와 매장 적용',description:'2026년 8월 27일부터 AI 장사스쿨에 참여하며 만든 사이트와 매장 활용 과정을 소개합니다.'};
export default async function SchoolPage(){
 const projects=await publicProjects();
 return <main id="main" className="school-page">
  <section className="school-page-intro shell"><Link className="text-link" href="/#projects">← 전체 사이트 보기</Link><p className="eyebrow">박가영의 교육 참여 기록</p><h1>AI 장사스쿨에서 배우고,<br/><span>가영이네에서 활용했습니다.</span></h1><p className="school-lead">반복되는 매장 업무를 줄이기 위해 AI를 배웠습니다.<br/>수업 참여부터 사이트 제작, 실제 사용과 개선까지 소개합니다.</p><nav className="school-toc" aria-label="발표 페이지 목차"><a href="#school-dates">참여 일정</a><a href="#school-story">만든 사이트</a><a href="#reflection">매장에서 달라진 점</a></nav></section>
  <section id="school-dates" className="shell school-dates"><h2>참여 일정</h2><ol><li><time dateTime="2026-08-27">2026. 08. 27</time><div><h3>AI 장사스쿨 첫 수업</h3><p>수업에 참여하며 매장에 필요한 도구를 만들기 시작했습니다.</p></div></li><li><time dateTime="2026-10-10">2026. 10. 10</time><div><h3>제작 사례 발표 예정</h3><p>만든 사이트와 매장 적용 과정을 약 10분 동안 소개할 예정입니다.</p></div></li></ol></section>
  <SchoolStory availableSlugs={[...projects.map(p=>p.slug),...recentWorks.map(w=>w.slug)]}/><Reflection/>
  <div className="shell school-return"><Link className="school-entry" href="/#projects">전체 사이트 목록으로 돌아가기 →</Link></div>
 </main>;
}
