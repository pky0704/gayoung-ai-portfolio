import Image from 'next/image';
import type {ReactNode} from 'react';
import type {ViewProject} from '@/lib/schema';
import Back from './Back';
import Capture from './Capture';
import PrepayAmountDemo from './PrepayAmountDemo';
import s from './PrepayCaseStudy.module.css';

const asset = '/case-study/prepay/';
function Chapter({number, label, title, children}:{number:string;label:string;title:ReactNode;children?:ReactNode}) {
  return <div className={s.chapter}><p className={s.eyebrow}><span>{number}</span> {label}</p><h2>{title}</h2>{children && <p className={s.intro}>{children}</p>}</div>;
}

export default function PrepayCaseStudy({project:p}:{project:ViewProject}) {
  return <main id="main" className={s.page}>
    <div className={s.container}>
      <div className={s.back}><Back slug={p.slug}/><span>매장에서 시작한 디지털 실험</span></div>
      <section className={s.hero} aria-labelledby="case-title">
        <p className={s.eyebrow}><span className={s.dot}/> GAYOUNGINE · PREPAY</p>
        <div className={s.heroHeading}><h1 id="case-title">종이 장부에서,<br/><em>온라인 신청으로.</em></h1><div className={s.heroCopy}><p>{p.title}</p><p>단골의 한 끼를 미리 준비하는 방법.<br/>매장에서 쓰던 선결제 장부를<br/>쉽게 이해하고 신청하는 화면으로 옮겼습니다.</p><a className={s.cta} href={p.url} target="_blank" rel="noopener noreferrer">선결제 사이트 체험하기 <span>↗</span></a></div></div>
        <div className={s.metadata}><span>개인 고객 · 부서 공동 이용</span><span>반응형 웹</span><span className={s.demoBadge}>화면 체험용 · 실제 결제 미연동</span></div>
      </section>
    </div>

    <section className={s.showcase} aria-label="PC와 모바일에서 보는 선결제 사이트">
      <div className={s.showcaseInner}>
        <div className={s.showcaseLabel}><span>THE SERVICE, AT A GLANCE</span><span>미리 채우고, 편하게 드세요.</span></div>
        <figure className={s.desktopMock}>
          <div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>가영이네 선결제</span><span aria-hidden="true">↗</span></div>
          <Image src={asset+'desktop.webp'} alt="가영이네 선결제 실제 PC 화면. 왼쪽은 적립 혜택, 오른쪽은 개인·부서 이용 신청서입니다." width={1348} height={926} priority sizes="(max-width: 700px) 92vw, 850px"/>
          <figcaption>PC · 실제 사이트 화면</figcaption>
        </figure>
        <figure className={s.phoneMock}>
          <div className={s.phoneFrame}><div className={s.phoneSpeaker} aria-hidden="true"/><iframe src={p.url} title="가영이네 선결제 실제 모바일 화면 체험" loading="lazy" sandbox="allow-scripts allow-same-origin" referrerPolicy="strict-origin-when-cross-origin"/></div>
          <figcaption>모바일 · 실제 사이트<br/>화면 안에서 스크롤해 보세요.</figcaption>
        </figure>
        <p className={s.showcaseNote}>한눈에 보는 혜택.<br/>순서대로 작성하는 신청서.</p>
      </div>
    </section>

    <nav className={s.sectionNav} aria-label="제작 이야기 목차"><div className={s.container}><a href="#prepay-why">만든 이유</a><a href="#prepay-design">화면 설계</a><a href="#prepay-guide">사용 방법</a><a href="#prepay-making">제작 과정</a></div></nav>

    <div className={s.container}>
      <section id="prepay-why" className={s.section}>
        <Chapter number="01" label="BACKGROUND" title={<>가게에서는 익숙한 일.<br/>손님에게는 번거로운 일.</>}>선결제를 하려면 매장에 들러 종이 장부를 작성해야 했습니다. 기관·부서와 단골 고객이 신청하는 과정을 더 편하게 만들고 싶었습니다.</Chapter>
        <div className={s.contextGrid}>
          <figure className={s.contextPhoto}><Image src={asset+'notebook.webp'} alt="우드 테이블에 놓인 종이 노트와 필기구. 수기 기록 상황을 설명하는 참고 사진" width={2200} height={1467} sizes="(max-width: 700px) 92vw, 540px"/><figcaption>수기 기록의 맥락을 보여주는 참고 이미지</figcaption></figure>
          <div className={s.problemList}><div><span>01</span><h3>방문해야 시작되는 신청</h3><p>선결제 신청을 위해 따로 매장을 찾는 번거로움.</p></div><div><span>02</span><h3>다시 확인해야 하는 정보</h3><p>신청자와 실제 포인트를 사용할 사람이 다를 수 있다는 점.</p></div><div><span>03</span><h3>말로 설명하던 적립 혜택</h3><p>금액에 따라 달라지는 추가 적립을 눈으로 확인할 필요.</p></div></div>
        </div>
        <div className={s.insight}><span>이번 프로젝트의 질문</span><p>“종이에 적던 내용을,<br/><strong>손님이 스스로 이해하고 신청</strong>할 수 있게 만들면?”</p></div>
      </section>

      <section className={s.section} aria-labelledby="solution-title">
        <Chapter number="02" label="THE APPROACH" title={<span id="solution-title">신청은 쉽게.<br/>확인은 분명하게.</span>}>운영 과정에서 확인해야 할 정보를, 화면의 순서와 역할로 풀었습니다.</Chapter>
        <div className={s.solutionGrid}>
          <article><div className={s.solutionGraphic} aria-hidden="true"><span className={s.paperIcon}>이름 ______<br/>번호 ______<br/>금액 ______</span><span>→</span><span className={s.digitalIcon}>선택<br/>입력<br/><b>확인 ✓</b></span></div><h3>장부 → 온라인 신청서</h3><p>개인과 부서의 이용 방식을 먼저 선택하고 필요한 정보를 입력합니다.</p></article>
          <article><div className={s.solutionGraphic} aria-hidden="true"><span className={s.personIcon}>신청자</span><span>→</span><span className={s.targetIcon}>충전 대상</span></div><h3>신청자와 충전 대상 구분</h3><p>신청하는 사람과 포인트를 사용할 번호를 따로 확인할 수 있게 합니다.</p></article>
          <article><div className={s.solutionGraphic} aria-hidden="true"><strong className={s.largeBenefit}>10<span>%</span></strong><span className={s.benefitTag}>금액에 따라<br/>바로 계산</span></div><h3>혜택을 숫자로 보여주기</h3><p>선결제 금액을 선택하면 추가 적립과 총 충전 예정 포인트가 함께 바뀝니다.</p></article>
        </div>
      </section>

      <section id="prepay-design" className={`${s.section} ${s.designSection}`}>
        <Chapter number="03" label="SCREEN DESIGN" title={<>한 화면 안에서,<br/>무엇을 해야 할지 알 수 있도록.</>}>혜택을 이해하는 영역과 신청하는 영역을 나누고, 중요한 선택부터 차례대로 배치했습니다.</Chapter>
        <div className={s.featureLayout}>
          <div className={s.featureScreen}><Image src={asset+'form.webp'} alt="실제 신청서 확대 화면: 개인·부서 선택, 신청자 정보, 충전 대상 번호, 선결제 금액 선택" width={610} height={730} sizes="(max-width: 700px) 88vw, 540px"/><span className={`${s.marker} ${s.markerOne}`}>1</span><span className={`${s.marker} ${s.markerTwo}`}>2</span><span className={`${s.marker} ${s.markerThree}`}>3</span></div>
          <div className={s.featureNotes}><article><span>1</span><div><h3>나 혼자, 또는 우리 부서 함께</h3><p>첫 선택에서 이용 목적을 구분해 이후 입력의 맥락을 잡습니다.</p></div></article><article><span>2</span><div><h3>포인트를 쓸 번호를 분명하게</h3><p>충전 대상 번호를 별도 항목으로 두고, 같을 때는 ‘신청자와 같아요’로 간단히 처리합니다.</p></div></article><article><span>3</span><div><h3>자주 쓰는 금액은 한 번에</h3><p>금액 버튼으로 빠르게 선택하고, 직접 입력도 할 수 있습니다.</p></div></article><div className={s.designPrinciple}><span>DESIGN LANGUAGE</span><p><i aria-hidden="true"/>오렌지는 혜택과 주요 행동에.<br/>흰 여백은 정보를 구분하는 데.</p></div></div>
        </div>
      </section>

      <section id="prepay-guide" className={s.section}>
        <Chapter number="04" label="HOW TO USE" title={<>신청부터 확인까지,<br/>이 순서로 체험해요.</>}>예시 정보를 사용하면 실제 개인정보 없이 전체 흐름을 살펴볼 수 있습니다.</Chapter>
        <ol className={s.steps}>
          <li><span>01</span><h3>이용 방식 선택</h3><p>개인 이용 또는<br/>부서 공동 이용을 선택해요.</p><div className={s.stepVisual}><span>개인 이용</span><span>부서 공동 이용</span></div></li>
          <li><span>02</span><h3>충전 정보 입력</h3><p>‘예시 정보로 체험하기’를 누르고<br/>충전할 번호를 확인해요.</p><div className={s.stepVisual}><span>예시 고객</span><span>010-0000-0000</span></div></li>
          <li><span>03</span><h3>금액과 혜택 확인</h3><p>선결제 금액을 선택하고<br/>총 충전 예정 포인트를 봐요.</p><div className={s.stepVisual}><span>100,000원</span><strong>110,000 P</strong></div></li>
          <li><span>04</span><h3>신청 내용 확인</h3><p>체험 안내에 동의한 뒤<br/>‘예시 신청 접수’를 눌러요.</p><div className={s.stepVisual}><span>내용 확인 ✓</span><strong>예시 신청 접수 →</strong></div></li>
        </ol>
        <div className={s.confirmGrid}><div><p className={s.eyebrow}>ONE MORE CHECK</p><h3>접수하기 전,<br/>한 번 더 확인해요.</h3><p>충전 대상 번호와 금액을 모아 보여줍니다. 잘못 입력했다면 ‘수정하기’로 돌아갈 수 있습니다.</p><p className={s.note}>아래 캡처는 예시 고객 정보로 체험한 실제 확인 화면입니다.</p></div><Capture src={asset+'confirm.webp'} title="신청 내용 확인" note="실제 프로토타입 · 예시 정보" url={p.url}/></div>
      </section>

      <section className={s.section}>
        <Chapter number="05" label="TRY THE NUMBERS" title={<>‘얼마나 더 적립되나요?’<br/>숫자가 바로 답하도록.</>}>10만 원 미만은 2%, 10만 원 이상은 10%. 설명을 읽는 것보다, 금액을 눌러보면 더 쉽습니다.</Chapter>
        <PrepayAmountDemo/>
      </section>
    </div>

    <section id="prepay-making" className={s.making}>
      <div className={s.container}>
        <Chapter number="06" label="BEHIND THE SCREENS" title={<>매장의 흐름을 관찰하고,<br/>화면으로 만들고, 다시 확인했습니다.</>}>실제 수기 장부의 흐름을 바탕으로 신청부터 관리까지 체험할 수 있는 프로토타입을 만들었습니다.</Chapter>
        <ol className={s.timeline}>
          <li><span>01</span><div><h3>현장의 불편 정리</h3><p>매장 방문과 종이 장부 작성에서 시작하는 선결제 과정을 살펴봤습니다.</p><b>출발점 · 실제 운영 흐름</b></div></li>
          <li><span>02</span><div><h3>필요한 정보와 순서 설계</h3><p>이용 구분, 신청자, 충전 대상, 금액을 나누고 고객과 관리자 화면의 역할을 정했습니다.</p><b>설계 · 신청과 관리의 흐름</b></div></li>
          <li><span>03</span><div><h3>작동하는 화면으로 구현</h3><p>적립금 계산, 신청 내용 확인, 신청내역과 관리자 상태 변경을 모의 기능으로 구성했습니다.</p><b>구현 · 체험형 프로토타입</b></div></li>
          <li><span>04</span><div><h3>읽기 쉬운 화면으로 개선</h3><p>모바일과 PC에서 글자와 입력 영역을 살피고, 실제 결제와 화면 체험을 구분하는 안내를 더했습니다.</p><b>개선 · 가독성과 안내</b></div></li>
        </ol>
        <div className={s.makingNote}><span>만들면서 중요했던 것</span><p>신청 화면을 만드는 것과<br/><strong>실제로 결제·충전되는 서비스</strong>를 만드는 것은<br/>각각 확인해야 할 일이었습니다.</p></div>
      </div>
    </section>

    <div className={s.container}>
      <section className={s.section}>
        <Chapter number="07" label="WHERE WE ARE" title={<>지금 체험할 수 있는 것.<br/>다음으로 연결할 것.</>}/>
        <div className={s.scopeGrid}><div><span className={s.scopeLabel}>지금 · 화면 체험 가능</span><ul><li>개인·부서 공동 이용 신청</li><li>금액별 추가 적립 계산</li><li>신청 내용 확인과 예시 접수</li><li>신청내역과 관리자 상태 변경 체험</li></ul><p>입력 내용은 매장에 전송되지 않으며, 새로고침하면 초기화됩니다.</p></div><div><span className={s.scopeLabel}>다음 · 실제 운영을 위한 연결</span><ul><li>서울페이 비대면 결제 방식 확인</li><li>페이히어 포인트 충전 연동 검토</li><li>고객 인증과 신청 데이터 저장</li><li>결제·충전 결과 알림 연결</li></ul><p>지원 방식과 운영 조건을 확인한 뒤 실제 서비스로 연결할 계획입니다.</p></div></div>
      </section>
      <section className={s.ending}>
        <p className={s.eyebrow}>SMALL SHOP, REAL EXPERIMENTS</p><h2>장부의 다음 페이지는,<br/>손님이 쓰기 쉬운 화면으로.</h2><p>가영이네 선결제의 첫 번째 디지털 실험을 둘러보세요.</p><a className={s.cta} href={p.url} target="_blank" rel="noopener noreferrer">선결제 사이트 체험하기 <span>↗</span></a><span className={s.endingNotice}>프로토타입 · 실제 결제와 충전은 진행되지 않습니다.</span>
      </section>
      <div className={s.credits}><p>사진: <a href="https://unsplash.com/photos/notebook-pens-pencil-and-coffee-ready-to-write-VUZZs_uzJok" target="_blank" rel="noopener noreferrer">Kelly Sikkema / Unsplash ↗</a> · 이용 상황을 설명하는 참고 이미지입니다.</p><p>PC 화면: 실제 사이트 캡처 · 모바일 화면: 실제 사이트 임베드 · 화면 확인: 2026. 09. 24.</p><Back slug={p.slug}/></div>
    </div>
  </main>;
}
