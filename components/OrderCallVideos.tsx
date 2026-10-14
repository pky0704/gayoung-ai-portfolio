import styles from './OrderCallVideos.module.css';
const base='/case-study/order-call/';
export default function OrderCallVideos(){return <section id="store-video" className={styles.section} aria-labelledby="store-video-title">
 <div className="eyebrow">실제 단골 고객 반응</div>
 <div className={styles.layout}>
  <figure className={styles.figure}>
   <video controls playsInline preload="none" width="540" height="960" aria-label="고객과 주문 호출 화면을 담은 실제 매장 영상, 30초">
    <source src={base+'customer-first.mp4'} type="video/mp4"/>
    영상을 재생할 수 없으면 <a href={base+'customer-first.mp4'}>영상 파일 열기</a>를 눌러 주세요.
   </video>
   <figcaption>실제 매장 촬영 · 약 30초 · 시작 장면과 현장 소리 유지</figcaption>
  </figure>
  <div className={styles.copy}>
   <h2 id="store-video-title">직접 만든 호출 화면을<br/>단골에게 보여드렸습니다.</h2>
   <p>사장이 만든 주문 호출 시스템을 단골 고객에게 보여드린 실제 현장 영상입니다. 고객의 반응과 매장 화면을 함께 담았습니다.</p>
   <p className={styles.note}>재생 버튼을 눌러 현장 영상을 확인하세요. 전체 화면으로 확대해 볼 수 있습니다.</p>
   <details className={styles.extra}>
    <summary>닉네임 호출 장면 보기 · 18초</summary>
    <video controls playsInline preload="none" width="540" height="960" aria-label="닉네임과 주문번호가 표시되는 실제 매장 호출 화면, 18초">
     <source src={base+'nickname-live.mp4'} type="video/mp4"/>
     <a href={base+'nickname-live.mp4'}>영상 파일 열기</a>
    </video>
   </details>
   <details className={styles.extra}>
    <summary>다른 호출 장면 보기 · 약 5초</summary>
    <video controls playsInline preload="none" width="540" height="960" aria-label="다른 주문의 실제 호출 화면, 약 5초">
     <source src={base+'pickup-live.mp4'} type="video/mp4"/>
     <a href={base+'pickup-live.mp4'}>영상 파일 열기</a>
    </video>
    <p>화면이 보이는 마지막 구간을 발췌하고 글자를 읽는 방향으로 회전했습니다.</p>
   </details>
  </div>
 </div>
</section>}
