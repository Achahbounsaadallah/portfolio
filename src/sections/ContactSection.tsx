import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../config';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { useT } from '../i18n';
import Availability from '../components/Availability';
import Magnet from '../components/Magnet';
import Particles from '../components/Particles';
import SpotlightCard from '../components/SpotlightCard';
import TiltCard from '../components/TiltCard';
import SplitReveal from '../components/SplitReveal';

function ContactCard({ children, href, disabled = false }: { children: ReactNode; href?: string; disabled?: boolean }) {
  const content = <TiltCard><SpotlightCard className={`h-full p-5 transition-colors hover:border-[#B600A8]/70 ${disabled ? 'opacity-45' : ''}`}>{children}</SpotlightCard></TiltCard>;
  return href && !disabled ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">{content}</a> : <div>{content}</div>;
}

export default function ContactSection() {
  const { dictionary } = useT();
  const { repos, followers } = useGithubRepos();
  const [subject, setSubject] = useState(''); const [message, setMessage] = useState(''); const [name, setName] = useState(''); const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false); const [sending, setSending] = useState(false); const [success, setSuccess] = useState(false); const [error, setError] = useState('');
  const selectStarter = (index: number) => { setSubject(dictionary.contact.starters[index]); setMessage(dictionary.contact.starterMessages[index]); };
  const copyEmail = async () => { await navigator.clipboard?.writeText(EMAIL); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) { setError(dictionary.contact.validation); return; }
    setError(''); const key = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env.VITE_WEB3FORMS_KEY; setSending(true);
    try {
      if (key) { const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: key, name, email, subject, message }) }); if (!response.ok) throw new Error('Unable to send'); }
      else window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      setSuccess(true);
    } catch { setError(dictionary.contact.failed); } finally { setSending(false); }
  };
  return <section id="contact" className="bg-[#0C0C0C] px-5 py-24 text-[#D7E2EA] sm:px-8 md:px-10 md:py-32"><div className="mx-auto max-w-6xl">
    <h2 className="hero-heading text-center text-6xl font-black uppercase leading-none sm:text-8xl md:text-[clamp(5rem,11vw,10rem)]"><SplitReveal text={dictionary.contact.heading} /></h2>
    <p className="mx-auto mt-6 max-w-xl text-center text-[#D7E2EA]/70">{dictionary.contact.intro}</p>
    <div className="mx-auto mt-10 max-w-3xl"><Availability /></div>
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ContactCard><Mail className="mb-7 text-[#B600A8]" /><h3 className="font-medium uppercase tracking-widest">{dictionary.contact.email}</h3><p className="mt-2 break-all text-xs text-[#D7E2EA]/60">{EMAIL}</p><div className="mt-6 flex items-center justify-between text-xs"><a href={`mailto:${EMAIL}`}>{dictionary.contact.sendEmail} <ArrowUpRight className="inline" size={14} /></a><button type="button" onClick={() => void copyEmail()} className="relative flex items-center gap-1 text-[#D7E2EA]/70" aria-label={dictionary.contact.copy}>{copied ? <><Check size={14} />{dictionary.contact.copied}</> : <><Copy size={14} />{dictionary.contact.copy}</>}</button></div>{copied && <Particles />}</ContactCard>
      <ContactCard href={GITHUB_URL}><Github className="mb-7 text-[#B600A8]" /><h3 className="font-medium uppercase tracking-widest">{dictionary.contact.github}</h3><p className="mt-2 text-xs text-[#D7E2EA]/60">github.com/Achahbounsaadallah</p><p className="mt-6 text-xs text-[#D7E2EA]/70">{repos.length} {dictionary.github.publicRepos.toLowerCase()} · {followers} {dictionary.github.followers.toLowerCase()}</p></ContactCard>
      <ContactCard href={LINKEDIN_URL} disabled={!LINKEDIN_URL}><Linkedin className="mb-7 text-[#B600A8]" /><h3 className="font-medium uppercase tracking-widest">{dictionary.contact.linkedin}</h3><p className="mt-2 text-xs text-[#D7E2EA]/60">SAAD ALLAH ACHAHBOUN</p><p className="mt-6 text-[10px] uppercase tracking-widest text-[#D7E2EA]/45">{LINKEDIN_URL ? dictionary.contact.linkedin : dictionary.contact.profileSoon}</p></ContactCard>
      <ContactCard href="tel:+212770287463"><Phone className="mb-7 text-[#B600A8]" /><h3 className="font-medium uppercase tracking-widest">{dictionary.contact.phone}</h3><p className="mt-2 text-xs text-[#D7E2EA]/60">+212 7 70 28 74 63</p><p className="mt-6 flex items-center gap-1 text-xs text-[#D7E2EA]/70"><MapPin size={13} />{dictionary.contact.location}</p></ContactCard>
    </div>
    <div className="mx-auto mt-14 max-w-3xl"><h3 className="mb-4 text-center text-xs uppercase tracking-widest text-[#D7E2EA]/60">{dictionary.contact.quickStart}</h3><div className="flex flex-wrap justify-center gap-2">{dictionary.contact.starters.map((starter, index) => <button key={starter} type="button" onClick={() => selectStarter(index)} className="rounded-full border border-[#D7E2EA]/20 px-3 py-2 text-xs text-[#D7E2EA]/75 transition-colors hover:border-[#B600A8]">{starter}</button>)}</div>
      <form onSubmit={submit} className="relative mt-8 rounded-3xl border border-[#B600A8]/45 bg-[#12121a] p-5 sm:p-8" aria-live="polite"><div className="grid gap-5 sm:grid-cols-2"><label className="relative"><input required value={name} onChange={(event) => setName(event.target.value)} placeholder=" " className="peer w-full border-b border-[#D7E2EA]/25 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#B600A8]" /><span className="pointer-events-none absolute left-0 top-3 text-sm text-[#D7E2EA]/45 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[10px]">{dictionary.contact.name}</span></label><label className="relative"><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder=" " className="peer w-full border-b border-[#D7E2EA]/25 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#B600A8]" /><span className="pointer-events-none absolute left-0 top-3 text-sm text-[#D7E2EA]/45 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[10px]">{dictionary.contact.emailLabel}</span></label></div><label className="relative mt-6 block"><input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder=" " className="peer w-full border-b border-[#D7E2EA]/25 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#B600A8]" /><span className="pointer-events-none absolute left-0 top-3 text-sm text-[#D7E2EA]/45 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[10px]">{dictionary.contact.subject}</span></label><label className="relative mt-6 block"><textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder=" " maxLength={1000} rows={5} className="peer w-full resize-none border-b border-[#D7E2EA]/25 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#B600A8]" /><span className="pointer-events-none absolute left-0 top-3 text-sm text-[#D7E2EA]/45 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[10px]">{dictionary.contact.message}</span><span className="absolute bottom-3 right-0 text-[10px] text-[#D7E2EA]/40">{message.length}/1000</span></label>{error && <p className="mt-4 text-sm text-red-300" role="alert">{error}</p>}<div className="mt-7 flex justify-end"><Magnet padding={60} strength={3}><button disabled={sending} type="submit" className="rounded-full bg-gradient-to-r from-[#7621B0] via-[#B600A8] to-[#BE4C00] px-7 py-3 text-xs font-medium uppercase tracking-widest text-white disabled:opacity-60">{sending ? dictionary.contact.sending : dictionary.contact.send}</button></Magnet></div>{success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-[#12121a]/95"><Check size={48} className="mb-3 text-green-300" /><Particles /><p className="text-lg">{dictionary.contact.success}</p></motion.div>}</form>
    </div></div></section>;
}
