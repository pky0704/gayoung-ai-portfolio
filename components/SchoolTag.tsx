import {schoolSlugs} from '@/lib/portfolio';
export default function SchoolTag({slug}:{slug?:string}) {
 if(slug && !schoolSlugs.includes(slug))return null;
 return <span className="school-tag"><span className="school-tag-icon" aria-hidden="true">✦</span>AI 장사스쿨 참여 중 제작</span>;
}
