"use client";
import { useLayoutEffect, useRef } from "react";

/** Place whole, rotated outlines in photographic space; never cut holes around copy. */
export default function BottleAccent() {
  const art = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const canvas = art.current;
    const page = canvas?.parentElement;
    if (!canvas || !page) return;
    let frame = 0;
    const place = () => {
      const bounds = page.getBoundingClientRect();
      const photos = Array.from(page.querySelectorAll<HTMLElement>('.split-photo,.photo-story,.company-photo,.world-images'));
      const obstacles = Array.from(page.querySelectorAll<HTMLElement>('h1,h2,h3,h4,p,dt,dd,li,figcaption,.pl-team span,a,summary,button')).map(el => {
        const r=el.getBoundingClientRect();
        return {left:r.left-bounds.left-36,right:r.right-bounds.left+36,top:r.top-bounds.top-70,bottom:r.bottom-bounds.top+70};
      });
      const width = Math.max(740, Math.min(1400,bounds.width*1.8));
      const scale=width/260, height=590*scale;
      canvas.querySelectorAll<SVGSVGElement>('svg').forEach((svg,index) => {
        const photo=photos[Math.round(index*(photos.length-1)/2)];
        if (!photo) return;
        const r=photo.getBoundingClientRect();
        const anchor=r.top-bounds.top+r.height/2;
        const path=svg.querySelector('path')!;
        const length=path.getTotalLength();
        const points=Array.from({length:240},(_,i)=>path.getPointAtLength(length*i/239));
        let best: {score:number;x:number;y:number;angle:number}|undefined;
        for(const angle of (index%2 ? [-65,-100,-35,65,100,35] : [65,100,35,-65,-100,-35])) {
          const rad=angle*Math.PI/180,c=Math.cos(rad),s=Math.sin(rad);
          for(const x of [-width*.32,bounds.width-width*.68,-width*.65,bounds.width-width*.35]) {
            for(const shift of [0,-r.height*.2,r.height*.2]) {
              const y=anchor-height/2+shift;
              const projected=points.map(p=>{const px=p.x*scale-width/2,py=p.y*scale-height/2;return {x:x+width/2+px*c-py*s,y:y+height/2+px*s+py*c};});
              let count=0,collision=false;
              for(let i=1;i<projected.length;i++) {
                const a=projected[i-1],b=projected[i];
                if(Math.max(a.x,b.x)<0||Math.min(a.x,b.x)>bounds.width||Math.max(a.y,b.y)<0||Math.min(a.y,b.y)>bounds.height)continue;
                count++;
                if(obstacles.some(o=>Math.max(a.x,b.x)>o.left&&Math.min(a.x,b.x)<o.right&&Math.max(a.y,b.y)>o.top&&Math.min(a.y,b.y)<o.bottom)){collision=true;break;}
              }
              if(!collision&&count>12&&(!best||count>best.score))best={score:count,x,y,angle};
            }
          }
        }
        svg.style.opacity=best?'1':'0';
        if(best)Object.assign(svg.style,{width:`${width}px`,height:`${height}px`,left:`${best.x}px`,top:`${best.y}px`,transform:`rotate(${best.angle}deg)`});
      });
    };
    const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(place);};
    const resize=new ResizeObserver(schedule);resize.observe(page);
    const mutation=new MutationObserver(schedule);mutation.observe(page,{childList:true,subtree:true,characterData:true});
    window.addEventListener('resize',schedule);
    page.addEventListener('transitionend',schedule,true);
    page.addEventListener('animationend',schedule,true);
    document.fonts.ready.then(schedule);
    schedule();
    return ()=>{cancelAnimationFrame(frame);resize.disconnect();mutation.disconnect();window.removeEventListener('resize',schedule);page.removeEventListener('transitionend',schedule,true);page.removeEventListener('animationend',schedule,true);};
  }, []);
  return <div ref={art} className="bottle-page-art" aria-hidden="true">{[0,1,2].map(index =>
    <svg key={index} className="bottle-fragment" viewBox="0 0 260 590" fill="none" focusable="false">
      <path vectorEffect="non-scaling-stroke" d="M82 23C104 36 151 38 166 25C178 12 132 8 91 22C100 58 101 121 88 161C78 188 49 191 32 217C13 245 33 277 30 319C28 374 12 428 15 487C16 528 17 554 44 560C90 579 195 567 226 528C253 495 230 455 227 412C222 370 235 317 235 273C233 231 205 198 185 164C160 124 157 91 163 62M45 560C15 541 69 533 99 539C133 544 167 563 161 577C150 593 99 575 69 564" />
    </svg>
  )}</div>;
}
