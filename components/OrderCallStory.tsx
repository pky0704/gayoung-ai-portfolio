import {orderDisplayUrl,projectUrls} from '@/lib/public-links';
import Image from 'next/image';
import Link from 'next/link';
import SchoolTag from './SchoolTag';
import OrderCallVideos from './OrderCallVideos';
import PresentationNav from './PresentationNav';
import s from './OrderCallStory.module.css';
const base='/case-study/order-call/';
function Screen({file,alt,caption}:{file:string;alt:string;caption:string}){return <figure className={s.figure}><Image src={base+file} alt={alt} width={720} height={1280} sizes="(max-width: 700px) 90vw, 420px"/><figcaption>{caption} · 실제 매장 영상에서 캡처</figcaption></figure>}
export default function OrderCallStory(){return <main id="main" className={'shell '+s.page}>
 <Link className="text-link" href="/#order-call">← 프로젝트 목록</Link>
 <header className={s.header}><SchoolTag slug="order-call"/><p className="eyebrow">매장 주문번호·닉네임 호출 · 실제 사용 중</p><h1>대형 매장의 편리함을,<br/>동네 분식집의 특별한 경험으로.</h1><p>기존 태블릿과 휴대폰으로 만든 주문 호출 시스템.<br/>단골의 닉네임을 부르며 가영이네만의 재미를 더했습니다.</p>
 <div className={s.metrics}><div><strong>0원</strong><span>기존 기기 활용 · 추가 지출</span></div><div><strong>3시간</strong><span>첫 버전 개발 · 이후 닉네임 추가</span></div><div><strong>매장 사용 중</strong><span>단골 고객과 직접 경험</span></div></div><p className={s.note}>비용·개발 시간은 운영자 경험 기준입니다. 0원은 기존 보유 기기와 이용 환경을 활용한 이번 구축의 추가 지출을 뜻합니다.</p></header>
 <nav className={s.nav} aria-label="주문 호출 발표 목차"><a href="#call-why">만든 이유</a><a href="#call-start">3시간의 시도</a><a href="#call-number">번호 호출</a><a href="#call-nickname">닉네임으로 확장</a><a href="#call-brand">단골과 브랜딩</a><a href="#call-store">매장 설치·QR</a><a href="#call-qr">접속 QR·시연 순서</a><a href="#store-video">단골 반응 영상</a></nav>
 <section id="call-why" className={s.section}><p className="eyebrow">01 · 시작한 이유</p><h2>“큰 매장에서는 당연한 시스템,<br/>우리 가게에서도 가능할까?”</h2><p className={s.lead}>월 이용료와 장비·설치 비용은 작은 가게에 부담이었습니다.</p><div className={s.compare}><article><h3>도입을 망설였던 이유</h3><p>당시 알아본 서비스는 월 사용료 3만 원에 대형 스크린 구매와 기사 방문 설치 등 비용 부담이 있었습니다.</p></article><article><h3>이미 가진 것부터 활용</h3><p>새 장비를 사는 대신 매장에 있던 태블릿과 휴대폰으로 직접 만들어 보기로 했습니다.</p></article></div></section>
 <section id="call-start" className={s.section}><div className={s.two}><div><p className="eyebrow">02 · 첫 개발</p><h2>“이게 될까?”에서<br/><em>3시간 만에 첫 버전으로.</em></h2><p>반신반의하며 AI와 개발을 시작했습니다. 첫 버전을 약 3시간 만에 만들고 매장에서 사용할 수 있는 시스템으로 완성했습니다.</p><p>손님에게는 준비되면 번호로 알려드린다는 안내를 보여줍니다. 가영이네 캐릭터와 말투도 화면에 담았습니다.</p></div><Screen file="wait-screen.jpg" alt="가영이네 캐릭터와 준비되면 번호로 알려드린다는 대기 안내 화면" caption="대기 안내 · 캐릭터와 가게의 말투"/></div></section>
 <section id="call-number" className={s.section}><div className={s.two}><div><p className="eyebrow">03 · 실제 사용</p><h2>기존 태블릿이<br/><em>우리 가게의 호출 화면으로.</em></h2><p>음식이 준비되면 큰 주문번호와 픽업 안내를 보여줍니다. 기존 휴대폰과 태블릿을 활용해 실제 매장에서 사용하고 있습니다.</p><p className={s.note}>주문번호는 직원이 직접 입력합니다. 페이히어 주문번호 자동 연동 기능은 아닙니다.</p></div><Screen file="number-screen.jpg" alt="음식이 준비됐어요 문구와 주문번호 0903, 픽업 안내가 표시된 매장 태블릿" caption="번호 호출 · 준비 완료와 픽업 안내"/></div></section>
 <section id="call-nickname" className={s.section}><div className={s.two}><div><p className="eyebrow">04 · 한 번 더 업그레이드</p><h2>번호를 넘어,<br/><em>단골의 닉네임을 부릅니다.</em></h2><p>“스타벅스처럼 닉네임을 불러드리면 더 재미있지 않을까?” 카페에서 익숙한 경험을 우리 분식집에도 더하고 싶었습니다.</p><p>닉네임 기능을 추가하고 단골에게 직접 물어봤습니다. 뜻밖의 장소에서 자기 닉네임이 불리는 경험에 즐거워하는 반응을 보았습니다.</p></div><Screen file="nickname-screen.jpg" alt="오리궁뎅이님이라는 닉네임과 주문번호 43을 함께 보여주는 실제 호출 화면" caption="닉네임 호출 · 단골에게 특별한 경험"/></div></section>
 <section id="call-brand" className={s.section}><p className="eyebrow">05 · 편리함에서 브랜딩으로</p><h2>말없이 호출하는 기계가,<br/><em>단골과 이야기를 나누는 계기가 됐습니다.</em></h2><div className={s.compare}><article><h3>공부의 결과를 보여드리다</h3><p>휴무일마다 공부하러 가는 저를 궁금해하던 단골들에게 직접 만든 결과물을 보여드렸습니다. 가게를 성장시키기 위한 공부라는 것을 눈앞의 변화로 전할 수 있었습니다.</p></article><article><h3>함께 만들어 가는 우리 가게</h3><p>닉네임을 묻고 함께 웃는 과정에서 더 가까워졌다고 느꼈습니다. 편리한 기능이 사장에 대한 신뢰와 가게를 응원하는 마음으로 이어질 수 있다는 가능성을 보았습니다.</p></article></div><blockquote>대형 프랜차이즈에서는 익숙한 호출 시스템.<br/>동네 분식집에서는 사장이 직접 만든,<br/><strong>예상 밖의 특별한 경험이 됐습니다.</strong></blockquote><p className={s.note}>단골 반응은 운영자가 직접 관찰한 실제 경험입니다. 신뢰·팬심의 변화는 운영자의 해석이며, 매출이나 재방문 효과를 수치로 측정한 결과는 아닙니다.</p></section>
 <section id="call-store" className={s.section}><div className={s.two}><div><p className="eyebrow">실제 매장 설치 사례</p><h2>매장 태블릿과<br/><em>QR 안내물을 함께 사용합니다.</em></h2><p>가영이네 매장에 설치한 태블릿과 QR 안내물이 함께 보이는 실제 사진입니다. 호출 화면은 위의 번호·닉네임 화면과 아래 영상에서 확인할 수 있습니다.</p><p className={s.note}>사진 속 QR 안내물을 주문번호 자동 연동 기능으로 설명하지 않습니다. 주문번호와 닉네임은 직원이 직접 입력합니다.</p><a className="primary" href={projectUrls['order-call']} target="_blank" rel="noopener noreferrer">발표용 주문 호출 체험 ↗</a><p className={s.note}>아래에서 매장 사례를 확인하고, 예시 주문번호로 호출을 체험할 수 있습니다.</p></div><figure className={s.figure}><a href="/case-study/order-call/store-qr.jpg" target="_blank" rel="noopener noreferrer"><Image src="/case-study/order-call/store-qr.jpg" alt="가영이네 실제 매장의 태블릿과 QR 안내물" width={1536} height={1534} sizes="(max-width: 700px) 90vw, 550px"/></a><figcaption>매장에서 사용하는 태블릿과 QR 안내물 · 실제 매장 사진</figcaption></figure></div></section><section id="call-qr" className={s.section}>
  <p className="eyebrow">발표용 주문 호출 체험</p>
  <h2>예시 번호로 두 화면을 체험해 보세요.</h2>
  <p>직원용 화면에서 번호를 호출하면 같은 화면에 고객용 결과가 보입니다. 태블릿을 함께 사용할 때는 직원용 화면의 ‘다른 기기에 고객 화면 열기’로 연결하세요.</p>
  <div className={s.compare}>
   <article><h3>01 · 직원용 체험</h3><Image src="/case-study/order-call/staff-demo-qr.png" alt="직원용 주문번호 호출 체험 QR" width={180} height={180}/><p>예시 번호와 닉네임을 입력하고 ‘완료 · 호출’을 누릅니다.</p><a className="primary" href={projectUrls['order-call']} target="_blank" rel="noopener noreferrer">직원용 체험 열기 ↗</a></article>
   <article><h3>02 · 고객용 화면 미리보기</h3><Image src="/case-study/order-call/display-demo-qr.png" alt="고객용 픽업 안내 예시 QR" width={180} height={180}/><p>고객 태블릿에 표시되는 번호와 닉네임을 예시로 확인합니다.</p><a className="primary" href={orderDisplayUrl} target="_blank" rel="noopener noreferrer">고객용 예시 열기 ↗</a></article>
  </div>
  <p className={s.note}>발표용 체험은 로그인 없이 이용할 수 있습니다. 실제 매장 주문과는 연결되지 않습니다.</p>
 </section><OrderCallVideos/><PresentationNav slug="order-call"/>
 </main>}
