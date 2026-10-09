import {schoolLabel,schoolSlugs} from '@/lib/portfolio';
export default function SchoolTag({slug}:{slug?:string}) {
 if(slug && !schoolSlugs.includes(slug))return null;
 return <span className="school-tag"><span className="school-tag-icon" aria-hidden="true">✦</span>{schoolLabel}</span>;
}
