/** Previously approved Kakao share illustrations, restored without changing artwork. */
export const shareImages:Record<string,string>={
 'menu-finder':'menu','brand-studio':'brand','competitor-analysis':'competitor',
 'online-prepay':'prepay','voice-recipe':'voice','review-helper':'review',
 'promo-studio':'promo','portfolio':'portfolio'
};
export function shareImage(slug:string){return shareImages[slug]?`/covers/kakao-${shareImages[slug]}.webp`:'';}
