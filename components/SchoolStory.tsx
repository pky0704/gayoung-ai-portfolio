import Link from 'next/link';
import {presentationOrder} from '@/lib/portfolio';
import {projectCopy} from '@/lib/editorial';
const descriptions:Record<string,string>={
 'menu-finder':'외국인 손님이 메뉴와 재료를 이해하도록',
 'online-prepay':'종이 장부 대신 온라인으로 신청하도록',
 'promo-studio':'홍보물 제작을 AI에 쉽게 요청하도록',
 'official-site':'가게 소개와 서비스를 한곳에서 찾도록',
 'menu-play':'취향을 선택하며 메뉴를 고르도록',
 'order-call':'주문번호와 대기시간을 확인하도록',
};
export default function SchoolStory({availableSlugs}:{availableSlugs:string[]}){
 return <section id="school-story" className="school-story"><div className="shell">
  <div className="school-story-heading"><div><p className="eyebrow">왜 만들었나요?</p><h2>조리와 응대 사이,<br/>반복되는 일을 줄이고 싶었습니다.</h2></div><p>엄마와 둘이 운영하는 분식집에서 메뉴 설명, 선결제 기록, 홍보물 준비에 필요한 도구를 하나씩 만들었습니다.</p></div>
  <div className="story-intro-grid"><article><span>01 · 매장의 불편</span><h3>설명하고 기록할 일이 많았습니다</h3><p>음식을 준비하면서 메뉴를 설명하고, 선결제 장부를 쓰고, 홍보물도 만들어야 했습니다.</p></article><article><span>02 · 사이트 제작</span><h3>필요한 기능부터 만들었습니다</h3><p>AI와 함께 신청서, 메뉴 안내, 홍보 요청문 작성 화면을 만들고 글자와 버튼을 다듬었습니다.</p></article><article><span>03 · 사용 후 개선</span><h3>직접 쓰면서 불편한 점을 고쳤습니다</h3><p>선결제 신청을 매장에서 사용하며 알림과 금액 계산을 보완했습니다. 아직 제작 중인 사이트도 함께 소개합니다.</p></article></div>
  <div className="presentation-heading"><h3>발표에서 소개할 사이트 6개</h3><p>각 항목을 누르면 만든 이유, 사용 방법, 현재 상태를 볼 수 있습니다.</p></div>
  <ol className="presentation-list">{presentationOrder.filter(slug=>availableSlugs.includes(slug)).map((slug,i)=><li key={slug}><Link href={'/projects/'+slug}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{projectCopy[slug]?.title}</strong><p>{descriptions[slug]}</p></div><span aria-hidden="true">↗</span></Link></li>)}</ol>
  <p className="school-context-note">‘AI 장사스쿨 참여 중 제작’ 표시는 수업 참여 기간에 만들거나 개선한 개인 프로젝트를 뜻합니다. 공식 과제 여부와는 구분합니다.</p>
  <div className="school-story-actions"><Link href="/?tag=school#projects" className="mint-button">참여 기간에 만든 프로젝트 모두 보기 →</Link><a className="text-link" href="#reflection">매장에서 달라진 점 ↓</a></div>
 </div></section>;
}
export function Reflection(){return <section id="reflection" className="shell reflection"><p className="eyebrow">실제 활용과 다음 목표</p><h2>매장에서 이렇게 달라졌습니다</h2><div className="reflection-grid"><article><span className="reflection-label">선결제 신청</span><h3>종이 장부에서 QR 신청으로</h3><p>손님은 QR로 신청하고, 저는 텔레그램으로 신청 내용을 받습니다. 계산된 금액을 확인해 페이히어에서 직접 충전합니다. 결제 확인은 별도로 진행합니다.</p></article><article><span className="reflection-label">외국인 메뉴 안내</span><h3>말로 설명하던 정보를 화면에</h3><p>손님이 메뉴 사진과 외국어 설명을 보고 고를 수 있도록 만들었습니다. 실제 손님의 반응과 선택 시간은 앞으로 기록할 예정입니다.</p></article><article><span className="reflection-label">음식점 홍보 준비</span><h3>AI에 요청할 내용을 한 번에 정리</h3><p>메뉴 정보와 원하는 분위기를 입력하면 복사할 요청문이 만들어집니다. 사진을 첨부하고 이미지와 글을 만드는 작업은 ChatGPT에서 진행합니다.</p></article></div><div className="growth-note"><span className="eyebrow">앞으로 할 일</span><h3>처음 쓰는 사람도<br/>쉽게 사용할 수 있도록</h3><p>손님과 다른 사장님의 사용 과정을 보며 어려운 문구와 조작을 고치겠습니다. 처리 시간이나 매출 변화 등 아직 측정하지 않은 수치는 비워두겠습니다.</p></div></section>}
