import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import NameLogo from '../components/NameLogo';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { useT } from '../i18n';

const links = [{ id: 'about', key: 'about' }, { id: 'experience', key: 'experience' }, { id: 'projects', key: 'projects' }, { id: 'contact', key: 'contact' }] as const;

export default function HeroSection() {
  const { language, setLanguage, t } = useT();
  const [active, setActive] = useState('about');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingFontSize, setHeadingFontSize] = useState<number | null>(null);
  useEffect(() => {
    const sections = links.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-25% 0px -60% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    let frame = 0;
    const fitHeading = () => {
      const heading = headingRef.current;
      if (!heading) return;
      setHeadingFontSize(null);
      frame = window.requestAnimationFrame(() => {
        const currentSize = Number.parseFloat(window.getComputedStyle(heading).fontSize);
        if (heading.scrollWidth > heading.clientWidth && currentSize > 0) {
          setHeadingFontSize(currentSize * (heading.clientWidth / heading.scrollWidth) * 0.98);
        }
      });
    };
    fitHeading();
    window.addEventListener('resize', fitHeading);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', fitHeading); };
  }, [language, t]);
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => { event.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: 'clip', background: '#0C0C0C' }}>
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(event) => navigate(event, l.id)}
               className="relative text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
              {t(`nav.${l.key}`)}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#B600A8] transition-all duration-300 ${active === l.id ? 'w-full' : 'w-0'}`} />
            </a>
          ))}
          <LayoutGroup id="language-switch"><div className="relative flex items-center rounded-full border border-[#D7E2EA]/20 p-1" role="group" aria-label={t('nav.language')}><button type="button" onClick={() => setLanguage('en')} className="relative z-10 rounded-full px-2 py-1 text-[10px] text-[#D7E2EA]">{language === 'en' && <motion.span layoutId="language-pill" className="absolute inset-0 -z-10 rounded-full bg-[#B600A8]/50" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}EN</button><button type="button" onClick={() => setLanguage('fr')} className="relative z-10 rounded-full px-2 py-1 text-[10px] text-[#D7E2EA]">{language === 'fr' && <motion.span layoutId="language-pill" className="absolute inset-0 -z-10 rounded-full bg-[#B600A8]/50" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}FR</button></div></LayoutGroup>
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="overflow-hidden px-6 md:px-10">
         <h1 ref={headingRef} style={headingFontSize ? { fontSize: `${headingFontSize}px` } : undefined} className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full mt-6 sm:mt-4 md:-mt-5 text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
           {t('hero.heading')}
        </h1>
      </FadeIn>

      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out" style={{ display: 'block' }}>
             <NameLogo />
          </Magnet>
        </FadeIn>
      </div>

      <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
             style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
             {t('hero.tagline')}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="relative z-20">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
