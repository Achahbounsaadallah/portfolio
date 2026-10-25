import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import FlowDiagram from '../components/FlowDiagram';
import ProjectLinkButton from '../components/ProjectLinkButton';
import type { Project } from './projectsData';
import CaseStudyModal, { hasCaseStudy } from '../components/CaseStudyModal';
import { useT } from '../i18n';

interface Props {
  project: Project;
  index: number;
  total: number;
  focused: boolean;
  onMouseEnter: () => void;
  onFocus: () => void;
}

const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

function GeneratedPanel({ project, type }: { project: Project; type: 'stack' | 'metric' | 'flow' }) {
  const { dictionary } = useT();
  const base = 'w-full overflow-hidden border border-[#D7E2EA]/20 bg-[radial-gradient(circle_at_80%_20%,rgba(182,0,168,0.18),transparent_36%),linear-gradient(135deg,#0C0C0C,#1a1a22)]';
  if (type === 'stack') return <div className={`${base} ${radius} p-5 sm:p-7 flex flex-wrap content-center gap-2`} style={{ height: 'clamp(130px, 16vw, 230px)' }}>{project.stack.map((tech) => <span key={tech} className="rounded-full border border-[#D7E2EA]/40 px-3 py-1 text-[#D7E2EA] font-light text-xs sm:text-sm">{tech}</span>)}</div>;
  if (type === 'metric') return <div className={`${base} ${radius} p-5 sm:p-7 flex items-end`} style={{ height: 'clamp(160px, 22vw, 340px)' }}><span className="text-[#D7E2EA] font-black uppercase leading-none" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 4rem)' }}>{project.metric}</span></div>;
  const badges = project.number === '01' ? [dictionary.projects.badges.first] : project.number === '03' ? dictionary.projects.badges.third : [];
  return <div className={`${base} ${radius} p-3 sm:p-6 h-full min-h-[290px]`}><FlowDiagram flow={project.flow} links={project.links} badges={badges} /></div>;
}

export default function ProjectCard({ project, index, total, focused, onMouseEnter, onFocus }: Props) {
  const { dictionary } = useT();
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  useEffect(() => { const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); if (window.location.hash === `#case-study-${slug}` && hasCaseStudy(project)) setCaseStudyOpen(true); }, [project]);
  const localized = dictionary.projects.data[index];
  const displayProject = { ...project, category: localized.category, description: localized.description, metric: localized.metric, flow: project.flow.map((flow, flowIndex) => ({ ...flow, role: localized.flow[flowIndex]?.role ?? flow.role, caption: localized.flow[flowIndex]?.caption ?? flow.caption })), links: localized.links };
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const headerOffset = 110;

  return (
    <div ref={container} className="h-[calc(85vh+110px)] md:h-[calc(85vh+140px)]" onMouseEnter={onMouseEnter} onFocus={onFocus}>
      <motion.div
         className={`sticky top-[calc(6rem+var(--stack-index)*110px)] md:top-[calc(8rem+var(--stack-index)*140px)] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 ${radius} transition-opacity duration-300 ${focused ? 'z-50' : ''}`}
         style={{ scale, background: '#0C0C0C', ['--stack-index' as string]: index, marginTop: 0, transformOrigin: 'top center' }}
         animate={focused ? { scale: 1 } : undefined}
         transition={{ scale: { duration: 0.3 } }}
      >
         <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-8 min-w-0">
            <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>{project.number}</span>
            <div className="flex flex-col min-w-0">
             <span className="text-[#D7E2EA] font-light uppercase tracking-wider text-xs sm:text-sm md:text-base opacity-60">{displayProject.category}</span>
               <h3 className="text-[#D7E2EA] font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{displayProject.name}</h3>
               <p className="text-[#D7E2EA] font-light opacity-60 max-w-xl" style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1.05rem)' }}>{displayProject.description}</p>
            </div>
          </div>
            <div className="hidden items-center gap-2 sm:flex"><ProjectLinkButton githubUrl={project.githubUrl} label={dictionary.projects.viewGithub} />{hasCaseStudy(project) && <button type="button" onClick={() => { setCaseStudyOpen(true); window.history.replaceState(null, '', `#case-study-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`); }} className="rounded-full border-2 border-[#B600A8] px-5 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]">{dictionary.projects.caseStudy}</button>}</div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4" style={{ width: '40%' }}>
              {displayProject.images ? <img src={displayProject.images[0]} alt={displayProject.name} width={800} height={450} loading="lazy" decoding="async" className={`w-full object-cover ${radius}`} style={{ height: 'clamp(130px, 16vw, 230px)' }} /> : <GeneratedPanel project={displayProject} type="stack" />}
              {displayProject.images ? <img src={displayProject.images[1]} alt={displayProject.name} width={800} height={450} loading="lazy" decoding="async" className={`w-full object-cover ${radius}`} style={{ height: 'clamp(160px, 22vw, 340px)' }} /> : <GeneratedPanel project={displayProject} type="metric" />}
          </div>
          <div style={{ width: '60%' }}>
              {displayProject.images ? <img src={displayProject.images[2]} alt={displayProject.name} width={800} height={900} loading="lazy" decoding="async" className={`w-full h-full object-cover ${radius}`} /> : <GeneratedPanel project={displayProject} type="flow" />}
          </div>
        </div>
       </motion.div>
       {caseStudyOpen && <CaseStudyModal project={project} onClose={() => { setCaseStudyOpen(false); if (window.location.hash.startsWith('#case-study-')) window.history.replaceState(null, '', window.location.pathname + window.location.search); }} />}
    </div>
  );
}
