import { lazy, Suspense, useEffect } from 'react';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ScrollProgress from './components/ScrollProgress';
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const GithubSection = lazy(() => import('./sections/GithubSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const Footer = lazy(() => import('./sections/Footer'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const FloatingCTA = lazy(() => import('./components/FloatingCTA'));
const IntroCurtain = lazy(() => import('./components/IntroCurtain'));

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0; let destroy = () => {};
    import('lenis').then(({ default: Lenis }) => { const lenis = new Lenis(); const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); }; frame = requestAnimationFrame(raf); destroy = () => lenis.destroy(); });
    return () => { cancelAnimationFrame(frame); destroy(); };
  }, []);
  return (
    <>
      <ScrollProgress />
      <Suspense fallback={null}><CustomCursor /><IntroCurtain /><FloatingCTA /></Suspense>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] opacity-[.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")" }} />
      <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <Suspense fallback={<div className="min-h-screen bg-[#0C0C0C]" />}><ExperienceSection /><ServicesSection /><ProjectsSection /><GithubSection /><ContactSection /><Footer /></Suspense>
      </main>
    </>
  );
}
