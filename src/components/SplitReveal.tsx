import { motion } from 'framer-motion';

export default function SplitReveal({ text, className = '' }: { text: string; className?: string }) {
  return <span className={className}>{text.split(' ').map((word, index) => <motion.span key={`${word}-${index}`} className="mr-[.25em] inline-block" initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ delay: index * .035, duration: .45 }}>{word}</motion.span>)}</span>;
}
