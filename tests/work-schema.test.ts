import test from 'node:test';
import assert from 'node:assert/strict';
import {workSchema,mergeWorks} from '../lib/work-schema.ts';
import type {ViewProject} from '../lib/schema.ts';
const work={id:'12345678-1234-4234-9234-123456789012',type:'site',name:'테스트',description:'',url:'https://example.com',adminUrl:'',stage:'미확인',usage:'미확인',createdDate:'',thumbnail:'',poster:'',prompt:'',notes:'',archived:false,updated_at:null} as const;
test('작업 날짜·상태·URL 검증',()=>{assert.equal(workSchema.safeParse(work).success,true);for(const patch of [{createdDate:'2026-02-30'},{stage:'공개'},{url:'javascript:alert(1)'},{adminUrl:'https://user:pass@example.com'},{thumbnail:'//evil.test/image'},{poster:'uploads/../secret'}])assert.equal(workSchema.safeParse({...work,...patch}).success,false);});
test('프롬프트 비공개 입력 및 미확인 날짜 보존',()=>{const p=workSchema.parse({...work,type:'prompt',url:'',prompt:'개인 원문',notes:'업무 메모',role:'admin'});assert.equal(p.createdDate,'');assert.equal(p.prompt,'개인 원문');assert.equal('role' in p,false);});
test('공개 포트폴리오만 가져오고 저장한 관리 기록 우선 적용',()=>{const published={id:work.id,title:'공개 사이트',summary:'설명',url:work.url,cover:'',coverSrc:'',visibility:'published'} as ViewProject;const hidden={...published,id:'22345678-1234-4234-9234-123456789012',visibility:'hidden'} as ViewProject;assert.equal(mergeWorks([published,hidden],[]).length,1);const saved={...work,name:'관리 이름',archived:true,thumbnailSrc:'',posterSrc:''};const rows=mergeWorks([published,hidden],[saved]);assert.equal(rows.length,1);assert.equal(rows[0].name,'관리 이름');assert.equal(rows[0].archived,true);});
