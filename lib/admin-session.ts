import {createHmac,randomBytes,timingSafeEqual,createHash} from 'node:crypto';
export const SESSION_SECONDS=60*60*12;
export const COOKIE_NAME=process.env.NODE_ENV==='production'?'__Host-gayoung-admin':'gayoung-admin';
export function passwordReady(password:string|undefined){return !!password && password.length>=12 && password.length<=256;}
export function passwordMatches(input:string,password:string){
 return timingSafeEqual(createHash('sha256').update(input).digest(),createHash('sha256').update(password).digest());
}
function signature(payload:string,password:string,serverSecret:string){
 const key=createHmac('sha256',serverSecret).update('gayoung-admin-session-v1\0'+password).digest();
 return createHmac('sha256',key).update(payload).digest('base64url');
}
export function issueSession(password:string,serverSecret:string,now=Date.now()){
 const payload=Buffer.from(JSON.stringify({exp:Math.floor(now/1000)+SESSION_SECONDS,nonce:randomBytes(24).toString('base64url')})).toString('base64url');
 return payload+'.'+signature(payload,password,serverSecret);
}
export function verifySession(token:string|undefined,password:string|undefined,serverSecret:string|undefined,now=Date.now()){
 if(!token||token.length>1024||!passwordReady(password)||!serverSecret)return false;
 const parts=token.split('.');if(parts.length!==2)return false;
 const [payload,sig]=parts;const expected=signature(payload,password!,serverSecret);
 if(!/^[A-Za-z0-9_-]{43}$/.test(sig)||sig.length!==expected.length||!timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return false;
 try{const {exp,nonce}=JSON.parse(Buffer.from(payload,'base64url').toString());return Number.isInteger(exp)&&exp>Math.floor(now/1000)&&exp<=Math.floor(now/1000)+SESSION_SECONDS&&typeof nonce==='string'&&nonce.length===32;}catch{return false;}
}
