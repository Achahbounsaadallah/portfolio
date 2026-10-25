import { motion } from 'framer-motion';
import { useT } from '../i18n';

export default function Availability() {
  const { dictionary } = useT();
  return <div className="relative rounded-3xl p-[1px]" style={{ background: 'linear-gradient(120deg, #7621B0, #B600A8, #BE4C00, #7621B0)', backgroundSize: '250% 250%', animation: 'availability-gradient 8s linear infinite' }}><div className="rounded-3xl bg-[#0C0C0C] px-4 py-4 text-center text-[#D7E2EA] sm:px-6"><p className="mb-3 text-sm font-medium uppercase tracking-widest">{dictionary.availability.line}</p><div className="flex flex-wrap justify-center gap-2">{dictionary.availability.chips.map((option, index) => <motion.span key={option} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-full border border-[#B600A8]/50 px-3 py-1 text-xs text-[#D7E2EA] transition-transform hover:-translate-y-1 hover:border-[#B600A8]">{option}</motion.span>)}</div></div><style>{'@keyframes availability-gradient{0%{background-position:0% 50%}100%{background-position:250% 50%}}'}</style></div>;
}
