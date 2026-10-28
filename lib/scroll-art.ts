export const BOTTLE_TRAVEL = 24;
export function bottleOffset(scrollY:number,viewportHeight:number,center:number,reduced=false) {
  return reduced?0:Math.max(-BOTTLE_TRAVEL,Math.min(BOTTLE_TRAVEL,(scrollY+viewportHeight/2-center)*.08));
}
export type Surface={left:number;right:number;top:number;bottom:number;photo:boolean;gold:boolean};
export function headerSurfaceTone(surfaces:Surface[],x:number,y:number):'dark'|'gold'|undefined {
 const hits=surfaces.filter(s=>s.left<=x&&s.right>x&&s.top<=y&&s.bottom>y);
 if(hits.some(s=>s.photo))return 'gold';
 return hits.length?(hits.some(s=>s.gold)?'dark':'gold'):undefined;
}
