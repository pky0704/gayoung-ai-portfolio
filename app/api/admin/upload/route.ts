import {NextResponse} from 'next/server';
import sharp from 'sharp';
import {authorize,sameOrigin} from '@/lib/supabase';
export const runtime='nodejs';
export async function POST(req:Request){if(!sameOrigin(req))return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403});const db=await authorize(req);if(!db)return NextResponse.json({error:'관리자 로그인이 필요합니다.'},{status:401});
 if(Number(req.headers.get('content-length')??0)>4_000_000)return NextResponse.json({error:'이미지는 3MB 이하로 올려 주세요.'},{status:413});
 try{const body=await req.formData();const f=body.get('file');if(!(f instanceof File)||f.size>3_000_000||!['image/png','image/jpeg','image/webp'].includes(f.type))return NextResponse.json({error:'3MB 이하의 PNG·JPG·WebP 파일을 선택해 주세요.'},{status:400});
 const content=await sharp(Buffer.from(await f.arrayBuffer()),{limitInputPixels:40_000_000}).rotate().resize({width:2400,withoutEnlargement:true}).webp({quality:90}).toBuffer();
 const path=`uploads/${crypto.randomUUID()}.webp`;const {error}=await db.storage.from('project-assets').upload(path,content,{contentType:'image/webp',upsert:false});if(error)throw error;
 const {data,error:signError}=await db.storage.from('project-assets').createSignedUrl(path,3600);if(signError)throw signError;
 return NextResponse.json({path,src:data.signedUrl});
 }catch{return NextResponse.json({error:'이미지를 올리지 못했습니다. 파일 형식과 저장소 연결을 확인해 주세요.'},{status:400});}}
