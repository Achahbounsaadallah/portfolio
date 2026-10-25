import type { CSSProperties, HTMLAttributes } from 'react';

export default function SpotlightCard({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`);
  };
  return <div {...props} onPointerMove={handleMove} className={`group relative overflow-hidden rounded-3xl border border-[#D7E2EA]/20 bg-[#12121a] before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100 ${className}`} style={{ '--mx': '50%', '--my': '50%', backgroundImage: 'radial-gradient(280px circle at var(--mx) var(--my), rgba(182,0,168,.14), transparent 70%)', ...props.style } as CSSProperties}>{children}</div>;
}
