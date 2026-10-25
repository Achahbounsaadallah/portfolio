import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0; let y = 0; let rx = 0; let ry = 0; let frame = 0;
    const move = (event: MouseEvent) => {
      x = event.clientX; y = event.clientY;
      const target = (event.target as HTMLElement).closest('a,button');
      const text = target?.tagName === 'BUTTON' && target.textContent?.toLowerCase().includes('copy') ? 'Copy' : target ? (target.tagName === 'A' && target.getAttribute('href')?.startsWith('http') ? 'Open' : 'View') : '';
      if (label.current) label.current.textContent = text;
      if (ring.current) { ring.current.style.width = text ? '64px' : '32px'; ring.current.style.height = text ? '64px' : '32px'; }
    };
    const tick = () => { rx += (x - rx) * .18; ry += (y - ry) * .18; if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`; if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`; frame = requestAnimationFrame(tick); };
    window.addEventListener('mousemove', move); frame = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame); };
  }, []);
  return <><div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[110] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7E2EA] md:block" /><div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[109] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D7E2EA]/60 text-[9px] text-[#D7E2EA] transition-[width,height] duration-200 md:flex"><span ref={label} /></div></>;
}
