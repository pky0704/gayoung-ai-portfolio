import Image from 'next/image';

type Usage = {question:string; answer:string; status:string; steps:string[]; evidence:string; result:string; image?:string};
const records:Record<string,Usage> = {
  'menu-finder': {
    question:'외국인 손님은 메뉴 도우미를 어떻게 사용하나요?',
    answer:'손님의 휴대폰에서 메뉴를 살펴본 뒤 매장 주문으로 이어지도록 만들었습니다. 메뉴를 고르는 화면과 실제 주문·결제 수단의 역할을 나눴습니다.',
    status:'사용 흐름 구현 · 실제 고객 반응 기록 예정',
    steps:['매장 QR 또는 안내 링크로 메뉴 사이트 열기','언어를 고르고 사진·재료·맵기·나라별 추천 살펴보기','먹고 싶은 메뉴를 좁히고 필요하면 한국어 화면을 직원에게 보여주기','매장 키오스크나 테이블오더에서 직접 주문·결제하기'],
    evidence:'발표 준비 자료의 매장 사용 흐름과 최신 메뉴 사이트 구현 기록을 대조했습니다. 실제 고객의 사용 횟수·반응·소요 시간은 아직 확인하지 않았습니다.',
    result:'반복해서 설명하던 메뉴 정보를 손님이 직접 읽고 비교할 수 있는 화면으로 옮겼습니다. 재료 검색은 취향 선택을 돕는 기능이며 알레르기 안전을 보증하지 않습니다.',
  },
  'brand-studio': {
    question:'매장 공지와 홍보물을 만들 때 어떻게 활용하나요?',
    answer:'매번 가게의 색상과 분위기를 처음부터 설명하지 않도록, 브랜드 기준과 수정 요청을 제작용 프롬프트로 정리하는 도구입니다.',
    status:'공개 프로토타입 · 브랜드 기준을 정리하는 단계',
    steps:['가게의 로고·색상·분위기 등 브랜드 기준 준비하기','만들거나 수정할 공지 내용과 변경할 부분 입력하기','정리된 프롬프트를 개인 AI 도구로 가져가기','실제 원본 자료를 첨부하고 결과가 브랜드 기준에 맞는지 확인하기'],
    evidence:'2026년 9월 7일(한국시간) 저장된 브랜드 콘텐츠 웹 MVP 설계서와 포트폴리오 PRD를 확인했습니다. 설계서의 자동 이미지 생성·검수 점수·영구 저장은 현재 사이트의 완성 기능으로 표시하지 않습니다.',
    result:'가게 스타일을 설명하는 기준을 반복해서 활용할 수 있도록 정리했습니다. 다른 사람이 사용해도 같은 가게의 홍보물처럼 보이게 만드는 것이 목표입니다.',
  },
  'competitor-analysis': {
    question:'경쟁가게 분석 결과를 장사에 어떻게 연결하나요?',
    answer:'다른 가게를 살펴보는 데서 끝나지 않고, 우리 가게에서 먼저 바꿀 일 세 가지와 확인할 지표를 정리하는 데 활용합니다.',
    status:'가영이네 사례 기반 데모 · 실행 성과 미측정',
    steps:['우리 가게와 경쟁가게 3곳의 공개 화면을 같은 기준으로 비교하기','메뉴·가격·사진·혜택과 주문 조건 확인하기','가영이네 사례의 핵심 결과·가게 비교·실행 계획 살펴보기','세트 구성·메뉴 노출 순서·대표 사진 개선안을 검토하고 이후 주문 지표 기록하기'],
    evidence:'2026년 9월 19일 작성한 MVP 결과물 전달자료의 실제 결과 화면입니다. 현재 결과는 미리 정리한 사례 데이터이며 이미지 OCR·사용자별 실시간 분석은 다음 개발 단계입니다.',
    result:'자료에는 제육덮밥과 수제튀김 세트, 추천 메뉴 노출 순서, 대표 사진·문구 통일이 제안되어 있습니다. 실제 메뉴 변경이나 매출 상승이 완료된 성과라는 뜻은 아닙니다.',
    image:'/case-study/competitor-analysis/usage-results.png',
  },
  'voice-recipe': {
    question:'말로 전하는 조리법을 어떻게 기록하려고 하나요?',
    answer:'조리법을 음성으로 설명하고, 이를 재료와 조리 순서가 정리된 문서로 남겨 다시 확인할 수 있도록 개발했습니다.',
    status:'개발·테스트 안내 기록 확인 · 내부 기능 재검증 필요',
    steps:['조리법을 말로 설명하며 음성 파일 준비하기','테스트 사이트에서 음성 파일 업로드하기','정리된 재료와 조리 순서를 원래 설명과 대조하기','레시피 문서를 내려받아 검토하고 피드백 남기기'],
    evidence:'2026년 8월 28일 개발 화면과 8월 31일(한국시간) 테스트 안내 자료에서 확인한 절차입니다. 현재 공개 접근 화면은 로그인 화면이며 내부 변환·다운로드의 최신 실행 여부는 검증 전입니다.',
    result:'기억과 구두 설명에 의존하던 조리법을 검토 가능한 기록으로 남기는 것이 목표입니다. 실제 매장 교육 시간 절감이나 문서 완성률은 측정하지 않았습니다.',
  },
};

export default function UsageEvidence({slug}:{slug:string}) {
  const record=records[slug];
  if(!record)return null;
  return <section className="store-usage" aria-labelledby={'usage-'+slug}>
    <p className="eyebrow">HOW IT HELPS · 활용 과정</p>
    <h2 id={'usage-'+slug}>{record.question}</h2>
    <p className="usage-answer">{record.answer}</p>
    <p className="work-status">{record.status}</p>
    <ol className="usage-record-steps">{record.steps.map(step=><li key={step}>{step}</li>)}</ol>
    {record.image ? <figure className="usage-source-image"><a href={record.image} target="_blank" rel="noopener noreferrer" aria-label="경쟁가게 분석 결과 자료 크게 보기"><Image src={record.image} alt="9월 19일 경쟁가게 분석 결과물 전달자료 4쪽: 핵심 결과 화면과 세트·메뉴 순서·대표 사진 개선 제안" width={1061} height={1500} sizes="(max-width: 700px) 85vw, 600px"/></a><figcaption>기존 결과물 전달자료 4쪽 · 눌러서 크게 보기</figcaption></figure> : null}
    <p className="usage-answer">{record.result}</p>
    <p className="evidence-note">{record.evidence}</p>
  </section>;
}
