import test from 'node:test';
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {issueSession,verifySession,passwordMatches,passwordReady,SESSION_SECONDS} from '../lib/admin-session.ts';
const password=randomBytes(24).toString('base64url'),secret=randomBytes(32).toString('base64url');
const now=Date.now();
test('session accepts correct signature and rejects tampering, expiry and rotated credentials',()=>{
 const token=issueSession(password,secret,now);
 assert.equal(verifySession(token,password,secret,now),true);
 assert.equal(verifySession(token,password,secret,now+SESSION_SECONDS*1000),false);
 assert.equal(verifySession(token,password+'x',secret,now),false);
 assert.equal(verifySession(token,password,secret+'x',now),false);
 const [payload,sig]=token.split('.');
 assert.equal(verifySession(payload+'.'+sig.slice(0,-1)+(sig.endsWith('a')?'b':'a'),password,secret,now),false);
 for(const input of [undefined,'','bad','a.b.c','a.b',payload+'.'+'가'.repeat(43),'x'.repeat(1025)])assert.equal(verifySession(input,password,secret,now),false);
 assert.equal(verifySession(token,undefined,secret,now),false);
 assert.equal(verifySession(token,password,undefined,now),false);
});
test('password matching and configuration fail closed',()=>{
 assert.equal(passwordMatches(password,password),true);
 assert.equal(passwordMatches('',password),false);
 assert.equal(passwordMatches(password+' ',password),false);
 assert.equal(passwordReady('short'),false);
 assert.equal(passwordReady(undefined),false);
 assert.equal(passwordReady('x'.repeat(257)),false);
});
