import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export interface FlowNode {
  name: string;
  role: string;
  caption: string;
}

interface Props {
  flow: FlowNode[];
  links: string[];
  badges?: string[];
}

const nodeVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({ opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.45 } }),
};

export default function FlowDiagram({ flow, links, badges = [] }: Props) {
  const diagram = useRef<HTMLDivElement>(null);
  const isInView = useInView(diagram, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const selectedIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    if (reducedMotion || !isInView || hoveredIndex !== null || flow.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % flow.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [flow.length, hoveredIndex, isInView, reducedMotion]);

  return (
    <div ref={diagram} className="flex h-full min-w-0 flex-col justify-between gap-4 text-[#D7E2EA]" onPointerLeave={() => setHoveredIndex(null)}>
      <div className="flex flex-wrap items-center gap-2">
        {badges.map((badge) => (
          <span key={badge} className="rounded-full border border-[#D7E2EA]/30 px-2.5 py-1 text-[10px] font-light opacity-70 sm:text-xs">{badge}</span>
        ))}
      </div>

      <div className="flex min-w-0 flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-1">
        {flow.map((node, index) => (
          <div key={node.name} className="flex min-w-0 flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
            <motion.button
              type="button"
              initial="hidden"
              animate={{ scale: selectedIndex === index ? 1.04 : 1, opacity: isInView ? 1 : 0, y: isInView ? 0 : 14 }}
              variants={nodeVariants}
              whileTap={{ scale: 1.04 }}
              onPointerEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(index)}
              className={`min-w-0 rounded-2xl border bg-[#12121a] px-3 py-3 text-left transition-[border-color,box-shadow] duration-300 md:flex-1 ${selectedIndex === index ? 'border-[#B600A8] shadow-[0_0_22px_rgba(182,0,168,0.35)]' : 'border-[#D7E2EA]/30'}`}
              transition={{ scale: { duration: 0.3 }, opacity: { delay: index * 0.15, duration: 0.45 }, y: { delay: index * 0.15, duration: 0.45 } }}
              aria-label={`${node.name}: ${node.role}`}
            >
              <span className="block truncate text-sm font-medium text-[#D7E2EA]">{node.name}</span>
              <span className="block truncate text-[10px] font-light opacity-60 sm:text-xs">{node.role}</span>
            </motion.button>
            {index < flow.length - 1 && (
              <div className="flex min-w-[54px] flex-1 items-center gap-1 md:min-w-[34px] md:flex-col md:justify-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ delay: index * 0.15, duration: 0.35 }} className="relative h-px min-w-0 flex-1 bg-gradient-to-r from-[#B600A8] to-[#7621B0] md:w-full">
                  {!reducedMotion && isInView && (
                    <motion.span className="absolute -top-1 h-2 w-2 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0]" animate={{ left: ['0%', '100%'] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: index * 0.15 }} />
                  )}
                </motion.div>
                <span className="shrink-0 text-[9px] font-light opacity-60 md:text-center">{links[index]}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[2.5rem] border-t border-[#D7E2EA]/15 pt-3 text-xs font-light leading-relaxed opacity-75">
        {reducedMotion ? flow.map((node) => <p key={node.name}>{node.caption}</p>) : flow[selectedIndex]?.caption}
      </div>
    </div>
  );
}
