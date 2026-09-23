'use client';
import {useState} from 'react';
import type {CaseExample} from '@/lib/case-studies';
import s from './ProjectCaseStudy.module.css';
export default function ProjectExample({examples}:{examples:CaseExample[]}){
 const [selected,setSelected]=useState(0);const example=examples[selected];
 return <div className={s.example}><div className={s.exampleTabs} aria-label="설명 예시 선택">{examples.map((e,i)=><button key={e.label} type="button" aria-pressed={i===selected} onClick={()=>setSelected(i)}>{e.label}</button>)}</div><div aria-live="polite" aria-atomic="true"><div className={s.exampleFlow}><div><span className={s.eyebrow}>INPUT · 시작하는 정보</span><ul>{example.input.map(x=><li key={x}>{x}</li>)}</ul></div><span className={s.flowArrow} aria-hidden="true">→</span><div><span className={s.eyebrow}>OUTPUT · 이어지는 구성</span><ul>{example.output.map(x=><li key={x}>{x}</li>)}</ul></div></div><p className={s.exampleNote}>{example.note}</p></div></div>;
}
