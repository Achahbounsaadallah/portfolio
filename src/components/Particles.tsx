import { motion } from 'framer-motion';

export default function Particles() { return <div className="pointer-events-none absolute inset-0 overflow-hidden">{Array.from({ length: 8 }, (_, index) => <motion.i key={index} className="absolute h-1 w-1 rounded-full bg-[#B600A8]" style={{ left: `${15 + index * 10}%`, top: `${35 + (index % 3) * 15}%` }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -30] }} transition={{ duration: 1.3, delay: index * .06 }} />)}</div>; }
