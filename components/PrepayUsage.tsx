import Image from 'next/image';
import s from './PrepayUsage.module.css';

const demo='https://gayoungene-prepay.vercel.app/demo.html';
const changes=[
 {icon:'book',before:'종이 장부에 직접 작성',after:'휴대폰으로 신청',detail:'이름·번호·금액이 디지털 기록으로 남습니다.'},
 {icon:'calculator',before:'계산기로 적립금 계산',after:'총 충전금액 자동 계산',detail:'5만 원은 51,000원, 10만 원은 110,000원.'},
 {icon:'bell',before:'장부를 보며 정보 확인',after:'텔레그램에서 한 번에 확인',detail:'연락처·신청금액·충전금액을 알림에 모았습니다.'},
];
function Icon({kind}:{kind:string}){
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
  {kind==='book'?<><rect x="10" y="6" width="30" height="36" rx="4"/><path d="M17 6v36M7 15h6M7 25h6M7 35h6M23 17h11M23 24h11M23 31h7"/></>:kind==='calculator'?<><rect x="10" y="5" width="28" height="38" rx="5"/><path d="M16 12h16v8H16zM16 27h2M24 27h2M32 27h0M16 34h2M24 34h2M32 34h0"/></>:kind==='bell'?<><path d="M10 33h28l-4-6V18a10 10 0 0 0-20 0v9zM20 39a4 4 0 0 0 8 0M24 5V3"/></>:<><rect x="13" y="4" width="24" height="40" rx="5"/><path d="M21 9h8M22 38h6M20 22l4 4 7-8"/></>}
 </svg>;
}
export default function PrepayUsage(){
 return <section className={s.story} aria-labelledby="prepay-usage-title">
  <div className={s.intro}><span className={s.kicker}>실제 매장 활용 사례</span><h2 id="prepay-usage-title">종이에 적고 계산하던 일을,<br/><em>신청 화면과 알림</em>으로.</h2><p>손님은 휴대폰으로 신청하고,<br/>저는 알림에 모인 정보를 확인해 충전합니다.</p></div>
  <nav className={s.nav} aria-label="선결제 사례 발표 순서">
   <a href="#prepay-before">01 이전의 불편</a><a href="#prepay-now">02 바뀐 업무</a><a href="#prepay-evidence">03 실제 알림</a><a href="#prepay-try">04 화면 체험</a>
  </nav>
  <section id="prepay-before" className={s.chapter} aria-labelledby="before-title"><span className={s.kicker}>01 · 무엇이 번거로웠나요?</span><h3 id="before-title">신청할 때마다,<br/>장부와 계산기를 꺼냈습니다.</h3><div className={s.beforeVisual}><Icon kind="book"/><span>손님이 직접 적기</span><span aria-hidden="true">＋</span><Icon kind="calculator"/><span>사장이 다시 계산하기</span></div><p className={s.lead}>고객이 종이 장부에 이름과 연락처를 적으면,<br/>저는 페이히어에서 고객을 찾고 적립금을 계산해 충전했습니다.</p><p className={s.note}>아이콘은 이전 업무를 설명하는 일러스트입니다. 실제 종이 장부 사진은 아닙니다.</p></section>
  <section id="prepay-now" className={s.chapter} aria-labelledby="now-title"><span className={s.kicker}>02 · 어떻게 달라졌나요?</span><h3 id="now-title">신청·계산·확인을<br/><em>한 흐름으로 연결했습니다.</em></h3><div className={s.comparison}>{changes.map(x=><article key={x.icon}><div className={s.icon}><Icon kind={x.icon}/></div><p className={s.before}>이전 · {x.before}</p><h4>{x.after}</h4><p>{x.detail}</p></article>)}</div><ol className={s.flow}><li><b>손님</b><span>매장 QR로 신청</span></li><li><b>사이트</b><span>계산·구글 시트 저장</span></li><li><b>텔레그램</b><span>신청 알림 전달</span></li><li><b>사장</b><span>결제 확인 후 직접 충전</span></li></ol><div className={s.boundary}><strong>결제 확인과 페이히어 충전은 제가 합니다.</strong><p>자동화한 부분은 신청 기록·금액 계산·신청 알림입니다.</p></div></section>
  <section id="prepay-evidence" className={s.chapter} aria-labelledby="evidence-title"><span className={s.kicker}>03 · 실제로 어떻게 쓰나요?</span><h3 id="evidence-title">휴대폰 알림에,<br/><em>충전할 금액까지 도착합니다.</em></h3><div className={s.evidence}><figure><a href="/case-study/prepay/telegram-redacted.webp" target="_blank" rel="noopener noreferrer" aria-label="개인정보를 가린 텔레그램 실제 알림 확대 (새 창)"><Image src="/case-study/prepay/telegram-redacted.webp" alt="실제 텔레그램 신청 알림의 개인정보 가림 편집본. 5만 원 신청은 51,000원, 10만 원 신청은 110,000원 충전 예정으로 표시됩니다." width={852} height={1846} sizes="(max-width:700px) 85vw, 360px"/></a><figcaption>2026.10.09 실제 수신 화면의 공개용 편집본<br/>이름·연락처·접수번호 가림 · 눌러서 확대</figcaption></figure><div className={s.evidenceCopy}><span className={s.kicker}>화면에서 볼 곳은 세 가지</span><ol><li><b>누구의 신청인지</b><span>연락처로 페이히어에서 고객 확인</span></li><li><b>얼마를 신청했는지</b><span>신청금액과 실제 결제 내역 대조</span></li><li><b>얼마를 충전할지</b><span>자동 계산된 총 충전금액 확인</span></li></ol><div className={s.amount}><span>10만 원 신청 예시</span><strong>100,000원 <small>＋ 10%</small></strong><em>110,000원 충전 예정</em></div><p className={s.takeaway}>계산기를 다시 두드리는 대신,<br/><strong>확인하고 충전하는 일에 집중합니다.</strong></p><p className={s.note}>신청 알림은 결제 완료 알림이 아닙니다. 화면 위쪽 메시지는 알림 재확인 테스트 기록입니다.</p></div></div></section>
  <section id="prepay-try" className={s.chapter} aria-labelledby="try-title"><span className={s.kicker}>04 · 짧게 체험해 볼까요?</span><h3 id="try-title">5만 원과 10만 원을 눌러,<br/>바뀌는 충전금액을 보여주세요.</h3><div className={s.demoCard}><div className={s.icon}><Icon kind="phone"/></div><div><h4>예시 정보 → 금액 선택 → 내용 확인</h4><p>체험판은 실제 장부에 저장하거나 알림을 보내지 않습니다.</p></div><a href={demo} className={s.cta} target="_blank" rel="noopener noreferrer">발표용 체험판 열기 ↗</a></div><p className={s.closing}>“종이에 적던 신청은 디지털 기록으로,<br/>직접 하던 계산은 <strong>자동 계산</strong>으로 바꿨습니다.”</p><p className={s.note}>업무 변화는 운영자의 실제 사용 설명 기준입니다. 처리 시간과 매출 효과는 아직 수치로 측정하지 않았습니다.</p></section>
 </section>;
}
