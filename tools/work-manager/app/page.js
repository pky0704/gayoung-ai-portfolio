import {auth,signIn} from '../auth.js';
import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Page({searchParams}) {
  const ready=!!(process.env.AUTH_SECRET&&process.env.AUTH_GOOGLE_ID&&process.env.AUTH_GOOGLE_SECRET&&process.env.ADMIN_EMAIL&&process.env.AUTH_URL&&process.env.DATABASE_URL);
  if(process.env.AUTH_SECRET&&(await auth())?.isAdmin)redirect('/work');
  const error=(await searchParams)?.error;
  return <main style={{minHeight:'100dvh',display:'grid',placeItems:'center',background:'#f7f5f1',fontFamily:'system-ui,sans-serif',padding:'24px',boxSizing:'border-box',color:'#202020'}}>
    <section style={{width:'100%',maxWidth:420,background:'white',border:'1px solid #dedbd5',borderRadius:24,padding:'40px 28px',boxSizing:'border-box'}}>
      <p style={{color:'#b74500',fontWeight:700}}>가영의 작업 관리함</p><h1 style={{fontSize:32,lineHeight:1.3}}>만든 것들을<br/>한곳에 모아두세요.</h1>
      <p style={{fontSize:18,lineHeight:1.7,color:'#666'}}>사이트와 프롬프트의 진행 상태,<br/>이미지와 링크를 관리하는 개인 공간입니다.</p>
      {error&&<p role="alert" style={{color:'#ac250e'}}>로그인하지 못했습니다. 허용된 Google 계정을 선택해 다시 시도해 주세요.</p>}
      {!ready&&<p role="status" style={{lineHeight:1.6}}>로그인과 저장 연결을 준비 중입니다. 연결이 끝나면 이용할 수 있습니다.</p>}
      <form action={async()=>{'use server';await signIn('google',{redirectTo:'/work'});}}><button disabled={!ready} style={{width:'100%',minHeight:54,border:'1px solid #ccc',borderRadius:12,background:ready?'#ff6600':'#eee',fontSize:18,fontWeight:700,cursor:ready?'pointer':'not-allowed'}}>Google 계정으로 로그인</button></form>
      <p style={{fontSize:14,color:'#777',marginTop:22}}>등록된 관리자만 접근할 수 있습니다.</p>
    </section></main>;
}
