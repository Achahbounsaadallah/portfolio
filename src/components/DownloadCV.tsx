import { Check, Download, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Magnet from './Magnet';
import { useT } from '../i18n';

const files = [
  ['Data Engineer (FR)', '/cv/Saad-Achahboun-CV-Data-Engineer-FR.pdf'],
  ['Full-Stack Developer (FR)', '/cv/Saad-Achahboun-CV-Full-Stack-FR.pdf'],
  ['Data & AI (EN)', '/cv/Saad-Achahboun-CV-Data-AI-EN.pdf'],
];

export default function DownloadCV() {
  const { language, t } = useT();
  const [open, setOpen] = useState(false); const [done, setDone] = useState(false); const ref = useRef<HTMLDivElement>(null);
  const orderedFiles = language === 'fr' ? [files[0], files[1], files[2]] : [files[2], files[0], files[1]];
  useEffect(() => { const close = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); }; const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; document.addEventListener('mousedown', close); document.addEventListener('keydown', escape); return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', escape); }; }, []);
  return <div ref={ref} className="relative"><Magnet padding={80} strength={3}><button type="button" onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-full border border-[#D7E2EA] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:border-[#B600A8] hover:text-white" aria-expanded={open}>{done ? <><Check size={15} />{t('about.downloaded')}</> : <><Download size={15} />{t('about.download')}</>}<ChevronDown size={14} /></button></Magnet><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -8, scale: .96 }} animate={{ opacity: 1, y: 6, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .96 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }} className="absolute left-1/2 z-30 mt-2 w-60 -translate-x-1/2 rounded-2xl border border-[#D7E2EA]/20 bg-[#12121a] p-2 shadow-2xl">{orderedFiles.map(([label, href], index) => <a key={href} href={href} download onClick={() => { setOpen(false); setDone(true); window.setTimeout(() => setDone(false), 2000); }} className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs text-[#D7E2EA] hover:bg-[#B600A8]/20"><span>{label}</span>{index === 0 && <small className="text-[9px] uppercase tracking-wider text-[#B600A8]">{t('about.recommended')}</small>}</a>)}</motion.div>}</AnimatePresence></div>;
}
