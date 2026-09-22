import Link from "next/link";
export default function Back({slug}:{slug:string}){return <Link href={`/#${slug}`}>← 프로젝트 목록</Link>;}
