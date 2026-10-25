import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from './projectsData';
import { useT } from '../i18n';

export default function ProjectsSection() {
  const { dictionary } = useT();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [sectionHovered, setSectionHovered] = useState(false);

  return (
    <section id="projects" onMouseEnter={() => setSectionHovered(true)} onMouseLeave={() => { setSectionHovered(false); setActiveCard(null); }} onFocus={() => setSectionHovered(true)} className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ background: '#0C0C0C' }}>
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
         {dictionary.projects.heading}
      </h2>
      <div>
        {projects.map((p, i) => (
          <div key={p.number} className={sectionHovered && activeCard !== null && activeCard !== i ? 'opacity-[0.55] transition-opacity duration-300' : 'transition-opacity duration-300'}>
            <ProjectCard project={p} index={i} total={projects.length} focused={sectionHovered && activeCard === i} onMouseEnter={() => setActiveCard(i)} onFocus={() => setActiveCard(i)} />
          </div>
        ))}
      </div>
    </section>
  );
}
