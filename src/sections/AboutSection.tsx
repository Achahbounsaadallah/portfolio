import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import DownloadCV from '../components/DownloadCV';
import Availability from '../components/Availability';
import { useT } from '../i18n';

const base = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/';

const deco = [
  { src: 'moon_icon.11395d36.png', pos: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]', size: 'w-[120px] sm:w-[160px] md:w-[210px]', delay: 0.1, x: -80 },
  { src: 'p59_1.4659672e.png', pos: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]', size: 'w-[100px] sm:w-[140px] md:w-[180px]', delay: 0.25, x: -80 },
  { src: 'lego_icon-1.703bb594.png', pos: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]', size: 'w-[120px] sm:w-[160px] md:w-[210px]', delay: 0.15, x: 80 },
  { src: 'Group_134-1.2e04f3ce.png', pos: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]', size: 'w-[130px] sm:w-[170px] md:w-[220px]', delay: 0.3, x: 80 },
];

export default function AboutSection() {
  const { t } = useT();
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 gap-16 sm:gap-20 md:gap-24" style={{ background: '#0C0C0C' }}>
      {deco.map((d) => (
        <FadeIn key={d.src} delay={d.delay} x={d.x} y={0} duration={0.9} className={`absolute ${d.pos} ${d.size}`}>
          <img src={base + d.src} alt="" width={220} height={220} loading="lazy" decoding="async" className="w-full h-auto" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
             {t('about.heading')}
          </h2>
        </FadeIn>
        <AnimatedText
           text={t('about.text')}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4"><ContactButton /><DownloadCV /></div>
      <div className="relative z-10 w-full max-w-3xl"><Availability /></div>
    </section>
  );
}
