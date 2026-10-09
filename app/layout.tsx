import Script from 'next/script';
import './kakao-browser-guide.css';
import type {Metadata} from 'next';
import Link from 'next/link';
import './globals.css';
import './readability.css';
import './portfolio.css';
import './refresh.css';
export const metadata:Metadata={metadataBase:new URL('https://gayoungai.vercel.app'),title:{default:'가영이네 AI 장사기록 | 박가영의 웹 포트폴리오',template:'%s | 가영이네 AI 장사기록'},description:'외식업 사장님 박가영이 장사에서 발견한 작은 불편을 AI와 함께 해결하며 직접 만든 웹사이트와 제작 과정을 기록합니다.',icons:{icon:'/favicon.svg'},openGraph:{"title": "가영이네 AI 장사기록", "description": "매장에 필요한 사이트와 직접 활용한 과정을 소개합니다.", "locale": "ko_KR", "type": "website", "images": [{"url": "https://gayoungai.vercel.app/share-kakao-20261009.png", "width": 1734, "height": 907, "alt": "가영이네 AI 장사기록"}]},twitter:{"card": "summary_large_image", "title": "가영이네 AI 장사기록", "description": "매장에 필요한 사이트와 직접 활용한 과정을 소개합니다.", "images": ["https://gayoungai.vercel.app/share-kakao-20261009.png"]}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ko"><body><a className="skip" href="#main">본문 바로가기</a><header className="header"><div className="shell header-inner"><Link className="wordmark" href="/"><span className="mark">g.</span><span>가영이네 <strong>AI 장사기록</strong></span></Link><nav aria-label="주요 메뉴"><Link href="/#projects">만든 사이트</Link><Link href="/ai-school">AI 장사스쿨</Link><Link href="/#about">소개</Link><a className="social-nav" href="https://www.instagram.com/gayoung.ai.note/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav></div></header>{children}<footer><div className="shell"><p className="footer-head">작은 가게의 실험은<br/>계속됩니다<span>.</span></p><div className="footer-bottom"><span>가영이네 AI 장사기록 · 박가영</span><a href="https://www.instagram.com/gayoung.ai.note/" target="_blank" rel="noopener noreferrer">@gayoung.ai.note ↗</a><Link href="/admin">관리</Link></div></div></footer><Script src="/kakao-browser-guide.js" strategy="afterInteractive" /></body></html>;}

