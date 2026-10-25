import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NameLogo from './NameLogo';

export default function IntroCurtain() { const [show, setShow] = useState(() => !sessionStorage.getItem('saad-intro-seen')); useEffect(() => { if (show) { sessionStorage.setItem('saad-intro-seen', '1'); const timer = window.setTimeout(() => setShow(false), 750); return () => window.clearTimeout(timer); } }, [show]); return <AnimatePresence>{show && <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0C0C0C]"><motion.div initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .45 }} className="w-52"><NameLogo /></motion.div></motion.div>}</AnimatePresence>; }
