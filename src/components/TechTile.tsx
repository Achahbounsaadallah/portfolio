import type { CSSProperties } from 'react';
import type { Tech } from '../sections/techData';
import TechLogo from './TechLogo';

type TechTileProps = Tech & { index: number };

const tileAnimations = `
  @keyframes tech-drift { 0%, 100% { transform: translate(-8%, -5%) scale(1); } 50% { transform: translate(12%, 8%) scale(1.18); } }
  @keyframes tech-float { 0%, 100% { transform: translateY(-5px); } 50% { transform: translateY(5px); } }
  @keyframes tech-pulse { 0%, 100% { opacity: .22; transform: scale(.9); } 50% { opacity: .5; transform: scale(1.12); } }
  @keyframes tech-orbit { from { transform: rotate(0deg) translateX(38px) rotate(0deg); } to { transform: rotate(360deg) translateX(38px) rotate(-360deg); } }
  .tech-drift { animation: tech-drift 10s ease-in-out infinite; }
  .tech-float { animation: tech-float 4s ease-in-out infinite; }
  .tech-pulse { animation: tech-pulse 3.5s ease-in-out infinite; }
  .tech-orbit { animation: tech-orbit 7s linear infinite; }
  @media (prefers-reduced-motion: reduce) {
    .tech-drift, .tech-float, .tech-pulse, .tech-orbit { animation: none; }
  }
`;

export default function TechTile({ name, slug, devicon, iconify, color, role, index }: TechTileProps) {
  const delay = `${(index % 11) * -0.7}s`;
  const brandColor = `#${color}`;
  const animationStyle = { animationDelay: delay } as CSSProperties;

  return (
    <article className="group relative flex aspect-[4/3] w-[40vw] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(215,226,234,0.15)] bg-[#12121a] transition-transform duration-300 hover:scale-[1.05] hover:border-[rgba(188,0,168,0.6)] sm:w-[calc((100vw-24px)/3)] md:w-[calc((100vw-36px)/4)] lg:w-[calc((100vw-48px)/5)]">
      <style>{tileAnimations}</style>
      <div className="tech-drift absolute -inset-1/2 rounded-full bg-[radial-gradient(circle,#7621B0_0%,#B600A8_34%,transparent_70%)] opacity-25" style={animationStyle} />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 px-2">
        <div className="relative flex h-[50%] w-[50%] items-center justify-center">
          <div className="tech-pulse absolute h-[80%] w-[80%] rounded-full blur-xl" style={{ ...animationStyle, backgroundColor: brandColor }} />
          <div className="tech-float relative z-10 h-full w-full" style={animationStyle}>
            <TechLogo name={name} slug={slug} devicon={devicon} iconify={iconify} color={color} />
          </div>
          <span className="tech-orbit absolute left-1/2 top-1/2 z-20 h-1.5 w-1.5 rounded-full" style={{ ...animationStyle, backgroundColor: brandColor }} />
        </div>
        <h3 className="text-center text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA] sm:text-xs">{name}</h3>
        <p className="hidden text-center text-[10px] font-light text-[#D7E2EA]/60 md:block">{role}</p>
      </div>
    </article>
  );
}
