import Image from 'next/image';
import s from './CompetitorEvidence.module.css';

const sources=[
  {file:'jazz-source',title:'째즈김밥 강북수유점',text:'가게 상단에서 주문 조건과 고객에게 보이는 첫인상을 확인했습니다.'},
  {file:'minam-source',title:'미남떡볶이 2호점',text:'최소주문금액·배달 혜택과 메뉴 노출 방식을 살펴봤습니다.'},
  {file:'pork-source',title:'88제육 수유점',text:'대표 식사 메뉴의 구성·가격·사진을 비교했습니다.'},
];
const results=[
  {file:'result-summary',title:'01 · 핵심 결과',text:'밥 메뉴와 수제튀김을 함께 제안하는 세트 등, 먼저 검토할 일을 정리했습니다.'},
  {file:'result-compare',title:'02 · 가게 비교',text:'가영이네와 경쟁가게의 주문 조건과 특징을 같은 화면에서 확인했습니다.'},
  {file:'result-plan',title:'03 · 실행 계획',text:'세트 원가 확인, 메뉴 상단 재정렬, 대표사진 준비로 다음 행동을 구체화했습니다.'},
];
function Gallery({items}:{items:typeof sources}){return <div className={s.grid}>{items.map(item=><figure key={item.file}><a href={'/case-study/competitor-analysis/'+item.file+'.webp'} target="_blank" rel="noopener noreferrer" aria-label={item.title+' 화면 크게 보기'}><Image src={'/case-study/competitor-analysis/'+item.file+'.webp'} alt={item.title+' 실제 테스트 자료'} width={732} height={1583} sizes="(max-width: 600px) 85vw, 30vw"/></a><figcaption><h4>{item.title}</h4><p>{item.text}</p></figcaption></figure>)}</div>}
export default function CompetitorEvidence(){return <div id="competitor-case" className={s.case}>
  <h3>가영이네 자료로 직접 테스트했습니다</h3>
  <p>2026년 9월 19일, 가영이네와 경쟁가게 3곳의 실제 배달앱 화면을 모아 비교했습니다. 사진을 누르면 원본 크기로 볼 수 있습니다.</p>
  <h3>비교에 사용한 실제 배달앱 화면</h3>
  <Gallery items={sources}/>
  <h3>테스트에서 확인한 결과 화면</h3>
  <Gallery items={results}/>
  <p className={s.note}>결과 화면은 당시 MVP 전달자료에서 추출했습니다. 실제 캡처를 바탕으로 미리 정리한 검증용 데이터의 시연이며, 사용자별 실시간 자동 분석이나 매출 개선 성과를 뜻하지 않습니다. 가격·혜택은 촬영 당시 기준입니다.</p>
</div>}
