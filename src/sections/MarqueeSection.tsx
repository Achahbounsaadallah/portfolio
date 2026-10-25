import { useEffect, useRef } from 'react';
import TechTile from '../components/TechTile';
import { techs, type Tech } from './techData';

const row1 = techs.slice(0, 11);
const row2 = techs.slice(11);
const BASE_SPEED = 40;

type RowRuntime = {
  track: HTMLDivElement | null;
  setWidth: number;
  position: number;
  flow: number;
  hovered: boolean;
  direction: 1 | -1;
};

function Row({ items, direction, runtime }: { items: Tech[]; direction: 1 | -1; runtime: RowRuntime }) {
  runtime.direction = direction;
  const setItems = items.map((tech, index) => <TechTile key={`${tech.name}-${index}`} {...tech} index={index} />);

  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') runtime.hovered = true; }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') runtime.hovered = false; }}
    >
      <div ref={(node) => { runtime.track = node; }} className="flex w-max" style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3 pr-3" data-set-width={copy === 0 ? 'measure' : undefined}>
            {copy === 0 ? setItems : items.map((tech, index) => <TechTile key={`${tech.name}-${copy}-${index}`} {...tech} index={index + copy * items.length} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Runtime = useRef<RowRuntime>({ track: null, setWidth: 0, position: 0, flow: 0, hovered: false, direction: 1 }).current;
  const row2Runtime = useRef<RowRuntime>({ track: null, setWidth: 0, position: 0, flow: 0, hovered: false, direction: -1 }).current;
  const scrollY = useRef(typeof window === 'undefined' ? 0 : window.scrollY);
  const scrollBoost = useRef(0);
  const visible = useRef(true);
  const hidden = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => { reducedMotion.current = query.matches; };
    const onScroll = () => {
      const current = window.scrollY;
      scrollBoost.current += (current - scrollY.current) * 0.3;
      scrollY.current = current;
    };
    const onVisibilityChange = () => { hidden.current = document.hidden; };
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; }, { threshold: 0 });
    const resizeObservers = [row1Runtime, row2Runtime].map((runtime) => {
      const resize = new ResizeObserver(() => {
        const measured = runtime.track?.querySelector<HTMLElement>('[data-set-width="measure"]');
        if (measured) {
          runtime.setWidth = measured.offsetWidth;
          runtime.position = -runtime.setWidth;
        }
      });
      if (runtime.track) resize.observe(runtime.track);
      return resize;
    });
    let previousTime = performance.now();
    let frame = 0;

    updateMotionPreference();
    query.addEventListener('change', updateMotionPreference);
    observer.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    const tick = (time: number) => {
      const delta = Math.min(time - previousTime, 64) / 1000;
      previousTime = time;
      const boost = scrollBoost.current;
      scrollBoost.current = 0;
      const targetFlow = (runtime: RowRuntime) => reducedMotion.current || hidden.current || !visible.current || runtime.hovered ? 0 : 1;
      [row1Runtime, row2Runtime].forEach((runtime) => {
        const direction = runtime.direction;
        runtime.flow += (targetFlow(runtime) - runtime.flow) * Math.min(1, delta / 0.3);
        if (runtime.setWidth) {
          runtime.position += direction * (BASE_SPEED * runtime.flow * delta + boost);
          runtime.position = -runtime.setWidth + ((((runtime.position + runtime.setWidth) % runtime.setWidth) + runtime.setWidth) % runtime.setWidth);
          if (runtime.track) runtime.track.style.transform = `translate3d(${runtime.position}px, 0, 0)`;
        }
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObservers.forEach((resize) => resize.disconnect());
      observer.disconnect();
      query.removeEventListener('change', updateMotionPreference);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [row1Runtime, row2Runtime]);

  return (
    <section ref={sectionRef} className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <Row items={row1} direction={1} runtime={row1Runtime} />
      <Row items={row2} direction={-1} runtime={row2Runtime} />
    </section>
  );
}
