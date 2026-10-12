import test from 'node:test';
import assert from 'node:assert/strict';
import {withEditorialProjects,editorialProjects} from '../lib/project-catalog.ts';
import {fromProject} from '../lib/work-schema.ts';
import type {ViewProject} from '../lib/schema.ts';
test('비공개 최근 프로젝트는 기본 공개 기록으로 다시 추가되지 않음',()=>{
 const hidden={...editorialProjects[0],visibility:'hidden' as const};
 const rows=withEditorialProjects([hidden]);
 assert.equal(rows.filter(p=>p.slug===hidden.slug).length,1);
 assert.equal(rows.filter(p=>p.visibility==='published').some(p=>p.slug===hidden.slug),false);
 const view=fromProject({...hidden,coverSrc:hidden.cover,screenshotSrcs:[]} as ViewProject);
 assert.equal(view.thumbnail,'/covers/kakao-promo.webp');
 assert.equal(view.url,'https://restaurant-promo-studio.vercel.app/');
});
