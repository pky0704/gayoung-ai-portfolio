import Image from 'next/image';

const before = [
  ['고객이 방문해 신청', '장부를 드리면 고객이 자리에 앉아 이름과 연락처 등을 펜으로 작성했습니다.'],
  ['결제를 직접 안내', '제로페이나 카드 결제를 도와드렸습니다.'],
  ['고객 조회와 수동 계산', '장부를 보며 페이히어에서 고객을 찾고, 계산기로 추가 적립금과 총 충전 금액을 계산했습니다.'],
  ['포인트 직접 충전', '계산한 금액을 입력해 충전했습니다. 종이 기록을 모아 통계로 활용하기도 번거로웠습니다.'],
];
const after = [
  ['포스터의 신청 QR 촬영', 'AI로 만든 포스터를 매장에 두고, 고객이 휴대폰으로 신청서를 열도록 안내합니다.'],
  ['신청서 작성 후 별도 결제', '고객이 온라인 신청서를 작성하고 옆에 준비된 제로페이 결제 QR로 결제합니다. 신청과 결제는 별도 과정입니다.'],
  ['텔레그램 신청 알림 확인', '신청이 들어오면 연락처, 신청 금액, 적립 내역 등 상세 정보가 텔레그램 메시지로 도착합니다.'],
  ['페이히어에서 직접 충전', '알림의 연락처로 고객을 확인하고 계산된 총 금액을 충전합니다. 계산기를 사용하는 과정이 줄었습니다. 결제 완료 여부는 별도로 확인해야 합니다.'],
];

export default function PrepayUsage() {
  return <section className="store-usage" aria-labelledby="prepay-usage-title">
    <p className="eyebrow">IN THE STORE · 실제 활용</p>
    <h2 id="prepay-usage-title">“선결제 사이트는 매장에서<br/>어떻게 활용하시나요?”</h2>
    <p className="usage-answer">손님은 QR로 신청하고, 저는 알림을 보고 충전합니다. 종이에 적고 계산하던 과정이 온라인 신청과 자동 계산으로 바뀌었습니다.</p>
    <div className="usage-comparison">
      <article><span className="usage-label">이전 · 종이 장부와 계산기</span><ol>{before.map(([title,copy])=><li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ol></article>
      <article><span className="usage-label current">현재 · QR 신청과 텔레그램</span><ol>{after.map(([title,copy])=><li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ol></article>
    </div>
    <div className="usage-evidence">
      <figure><a href="/case-study/prepay/qr-poster.png" target="_blank" rel="noopener noreferrer" aria-label="선결제 안내 포스터 크게 보기"><Image src="/case-study/prepay/qr-poster.png" alt="가영이네 온라인 선결제 안내 포스터. 신청 QR, 적립 혜택, 신청서 작성·별도 결제·매장 확인 후 적립 순서가 표시되어 있습니다." width={990} height={1400} sizes="(max-width: 700px) 85vw, 420px"/></a><figcaption>제작한 선결제 안내 포스터 · 눌러서 크게 보기</figcaption></figure>
      <div><p className="eyebrow">사이트를 매장과 연결하기</p><h3>만든 화면을,<br/>손님이 열어볼 수 있도록.</h3><p>AI로 안내 포스터를 만들고 신청 QR을 넣었습니다. 매장에서는 신청 QR 옆에 제로페이 결제 QR도 함께 준비해, 신청을 마친 고객이 결제로 이어갈 수 있도록 안내합니다.</p><p>포스터에도 ‘신청서 작성 → 별도 결제 → 매장 확인 후 적립’을 표시했습니다. 사이트를 만드는 데서 끝나지 않고 손님이 실제로 접근하는 방법까지 준비한 것입니다.</p><p className="evidence-note">포스터 제작본이며 매장 설치 사진은 아닙니다. 포스터의 QR은 실제 신청 사이트로 연결됩니다.</p></div>
    </div>
    <div className="usage-evidence" id="telegram-evidence">
      <figure><a href="/case-study/prepay/telegram-redacted.webp" target="_blank" rel="noopener noreferrer" aria-label="개인정보를 가린 텔레그램 신청 알림 크게 보기"><Image src="/case-study/prepay/telegram-redacted.webp" alt="텔레그램 신청 알림 공개용 편집본. 5만 원 신청의 예상 충전합계 5만 1천 원과 10만 원 신청의 예상 충전합계 11만 원을 보여줍니다. 이름·연락처·접수번호는 가렸습니다." width={852} height={1846} sizes="(max-width: 700px) 85vw, 500px"/></a><figcaption>2026. 10. 09 제공된 실제 수신 화면의 공개용 편집본 · AI 도구로 개인정보 가림 처리 · 눌러서 크게 보기</figcaption></figure>
      <div><p className="eyebrow">신청이 들어오면, 휴대폰으로</p><h3>알림 안에,<br/>충전에 필요한 내역을 모았습니다.</h3><p>신청자의 연락처와 신청일시, 결제수단, 신청금액, 예상 보너스와 충전합계를 한 번에 확인합니다. 계산기로 적립금을 다시 계산하지 않고, 알림에 표시된 내역을 확인해 페이히어에서 직접 충전합니다.</p><ul><li>5만 원 신청 → 예상 보너스 1,000원 → 예상 충전합계 51,000원</li><li>10만 원 신청 → 예상 보너스 10,000원 → 예상 충전합계 110,000원</li></ul><p>화면에도 ‘신청 접수 알림’임을 명시했습니다. <strong>실제 결제를 확인한 다음 페이히어에서 충전</strong>하며, 알림 수신만으로 결제나 충전이 완료되는 것은 아닙니다.</p><p className="evidence-note">위쪽은 알림 재확인 테스트 메시지입니다. 공개용 편집본의 금액·적립률·안내 문구를 제공된 원본과 대조했습니다. 고객정보가 있는 원본은 공개하지 않습니다.</p></div>
    </div>
    <div className="usage-future"><span className="work-status">앞으로 할 일 · 네이버 안내 게시 전</span><h3>매장에 오지 않아도 신청할 수 있도록.</h3><p>네이버 공지와 블로그에 온라인 선결제 신청 방법과 제로페이 비대면 결제를 안내할 예정입니다. 고객이 선결제만을 위해 방문하는 번거로움을 줄이려는 계획입니다.</p></div>
    <div className="change-grid"><div><b>현재 달라진 점</b><p>고객 정보를 다시 읽고 계산기로 적립금을 계산하는 단계를 줄였습니다. 신청 내역도 종이 대신 디지털 기록으로 남습니다.</p></div><div><b>앞으로 기대하는 점</b><p>쌓인 기록을 고객 관리와 통계에 활용하려고 합니다. 통계 기능과 시간 절감 수치는 아직 검증 전입니다.</p></div></div>
  </section>;
}
