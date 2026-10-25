import { useEffect, useState, type ReactNode } from 'react';

export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return <div className={className} style={{ perspective: 900 }} onPointerMove={(event) => { if (reduced || event.pointerType !== 'mouse') return; const b = event.currentTarget.getBoundingClientRect(); setRotation({ x: ((event.clientY - b.top) / b.height - .5) * -12, y: ((event.clientX - b.left) / b.width - .5) * 12 }); }} onPointerLeave={() => setRotation({ x: 0, y: 0 })}><div style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transition: 'transform .3s ease', transformStyle: 'preserve-3d' }}>{children}</div></div>;
}
