"use client";
import Image from 'next/image';
import {useRef,useState,useEffect} from 'react';
export default function Capture({src,title,note,url}:{src:string;title:string;note:string;url:string}){
 const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement>(null);const [failed,setFailed]=useState(false);
 useEffect(()=>{const d=dialog.current;const release=()=>{document.body.style.overflow='';trigger.current?.focus();};d?.addEventListener('close',release);return()=>{d?.removeEventListener('close',release);document.body.style.overflow='';};},[]);
 return <figure className="capture"><button ref={trigger} className="capture-button" aria-label={`${title} 실제 화면 확대`} onClick={()=>{dialog.current?.showModal();document.body.style.overflow='hidden';}} disabled={failed}>
 {failed?<span className="image-error">화면을 불러오지 못했어요</span>:<Image src={src} alt={`${title} — ${note}`} width={1364} height={940} unoptimized onError={()=>setFailed(true)}/>}<span className="zoom-label">확대 보기 ↗</span></button>
 <figcaption><span>{note}</span>{failed?<a href={url} target="_blank" rel="noopener noreferrer">사이트 보기 ↗</a>:<span aria-hidden>＋</span>}</figcaption>
 <dialog ref={dialog} className="lightbox" aria-label={`${title} 실제 화면 확대`} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}><div className="lightbox-bar"><span>{title}</span><button autoFocus onClick={()=>dialog.current?.close()}>닫기 ×</button></div><div className="lightbox-content"><Image src={src} alt={`${title} 실제 화면`} width={1364} height={940} unoptimized style={{width:'100%',height:'auto'}}/></div></dialog></figure>;
}
