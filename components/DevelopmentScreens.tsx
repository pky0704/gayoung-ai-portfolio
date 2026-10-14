import Image from 'next/image';
import s from './DevelopmentScreens.module.css';
const screens:Record<string,{title:string;note:string;items:[string,string][]}>={
 'menu-play':{title:'취향을 고르면, 추천 메뉴까지',note:'2026. 10. 14. 개발 중인 공개 시연 화면을 직접 조작해 캡처했습니다. 실제 고객 이용 결과는 아닙니다. 예시 선택: 피하는 재료 없음 → 분식 한 접시 → 맵기 상관없음.',items:[['menu-play-start','01 · 피해야 할 재료 확인'],['menu-play-choice','02 · 먹고 싶은 메뉴 선택'],['menu-play-result','03 · 조건에 맞는 메뉴 확인']]},
 'official-site':{title:'가게 이야기에서 메뉴 안내로',note:'2026. 10. 14. 개발 중인 공식 사이트 화면입니다. 매장 외관 사진으로 교체한 브랜드 이야기 화면을 함께 담았습니다.',items:[['official-home','01 · 가게 소개와 메뉴 바로가기'],['official-story','02 · 매장 사진과 브랜드 이야기']]},
 'promo-studio':{title:'홍보 정보를 입력하고 요청문을 완성합니다',note:'2026. 10. 14. 가영이네·1988옛날떡볶이·카카오톡 채널을 예시로 직접 테스트한 화면입니다. 완성 이미지와 게시글 제작은 ChatGPT에서 이어집니다.',items:[['promo-home','01 · 홍보 준비 시작'],['promo-result','02 · 맞춤 프롬프트 생성 완료']]}
};
export default function DevelopmentScreens({slug}:{slug:string}){const item=screens[slug];if(!item)return null;return <section className={s.section} aria-labelledby={'screens-'+slug}><p className="eyebrow">실제 화면 · 사용 흐름</p><h2 id={'screens-'+slug}>{item.title}</h2><p>{item.note}</p><div className={s.grid}>{item.items.map(([file,label])=><figure key={file}><a href={'/case-study/development/'+file+'.jpg'} target="_blank" rel="noopener noreferrer" aria-label={label+' 크게 보기'}><Image src={'/case-study/development/'+file+'.jpg'} alt={label} width={1363} height={file==='menu-play-result'?1963:936} sizes="(max-width: 700px) 90vw, 550px"/></a><figcaption>{label} · 클릭하면 확대</figcaption></figure>)}</div></section>}
