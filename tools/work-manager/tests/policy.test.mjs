import test from 'node:test';
import assert from 'node:assert/strict';
import {allowGoogle,allowedEmail,sameOrigin,safeURL,validateWork,imageType} from '../lib/policy.mjs';
const email='admin@example.com';
const valid={type:'site',name:'작업',stage:'개발 중',usage:'테스트 중',url:'https://example.com',createdDate:'2026-10-09'};
test('Google의 검증된 단일 계정만 허용',()=>{
 assert.equal(allowGoogle({provider:'google'},{email,email_verified:true},email),true);
 for(const profile of [{email,email_verified:false},{email:'other@example.com',email_verified:true},{email,email_verified:'true'},{}])assert.equal(allowGoogle({provider:'google'},profile,email),false);
 assert.equal(allowGoogle({provider:'github'},{email,email_verified:true},email),false);
 assert.equal(allowedEmail(email,''),false);
});
test('설정된 Origin과 정확히 일치하는 쓰기만 허용',()=>{
 assert.equal(sameOrigin(new Request('https://work.example/api',{headers:{origin:'https://work.example'}}),'https://work.example/'),true);
 for(const origin of ['https://evil.example','https://work.example.evil.test','null',''])assert.equal(sameOrigin(new Request('https://work.example/api',{headers:{origin}}),'https://work.example'),false);
 assert.equal(sameOrigin(new Request('https://work.example/api'),''),false);
});
test('스크립트 URL·자격증명이 포함된 링크 차단',()=>{for(const url of ['javascript:alert(1)','data:text/html,x','file:///etc/passwd','https://user:pass@example.com'])assert.equal(safeURL(url),'');assert.equal(safeURL('https://example.com/path?q=a#b'),'https://example.com/path?q=a#b');});
test('잘못된 상태·날짜·크기·자료형 거절',()=>{
 assert.equal(validateWork(valid).name,'작업');
 for(const override of [{name:''},{type:'admin'},{stage:'done'},{usage:'yes'},{createdDate:'2026-02-30'},{url:'javascript:alert(1)'},{thumbnailId:'../secret'},{description:1},{name:'a'.repeat(101)}])assert.throws(()=>validateWork({...valid,...override}));
});
test('알 수 없는 날짜와 관리자 주소는 빈값 유지',()=>{const w=validateWork({...valid,createdDate:'',adminUrl:''});assert.equal(w.createdDate,'');assert.equal(w.adminUrl,'');});
test('이미지 파일 시그니처 확인',()=>{assert.equal(imageType(Buffer.from('<svg onload="alert(1)">')),'');assert.equal(imageType(Buffer.from([137,80,78,71,13,10,26,10])),'image/png');assert.equal(imageType(Buffer.from([255,216,255])),'image/jpeg');});
