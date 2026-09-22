import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projectSchema,asset} from '../lib/schema.ts';
const p=JSON.parse(readFileSync(new URL('../data/projects.json',import.meta.url),'utf8'))[0];
test('공개 프로젝트 필수 이미지와 사실 설명 검사',()=>{assert.equal(projectSchema.safeParse(p).success,true);for(const key of ['cover','problem','scope'])assert.equal(projectSchema.safeParse({...p,[key]:''}).success,false);assert.equal(projectSchema.safeParse({...p,screenshots:[]}).success,false);});
test('이미지 없는 임시저장 허용',()=>assert.equal(projectSchema.safeParse({...p,cover:'',screenshots:[],problem:'',scope:'',visibility:'draft'}).success,true));
test('스크립트 URL과 외부 이미지 경로 거부',()=>{assert.equal(projectSchema.safeParse({...p,url:'javascript:alert(1)'}).success,false);for(const path of ['//evil.test/x','/captures/../../secret','https://evil.test/x','uploads/a.svg'])assert.equal(asset.safeParse(path).success,false);});
test('임의 추가 필드와 관리자 정보 저장 차단',()=>{const r=projectSchema.parse({...p,admin:true,service_role_key:'secret'});assert.equal('admin' in r,false);assert.equal('service_role_key' in r,false);});
