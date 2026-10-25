import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() { const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 }); return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left" style={{ scaleX, background: 'linear-gradient(90deg,#B600A8,#BE4C00)' }} />; }
