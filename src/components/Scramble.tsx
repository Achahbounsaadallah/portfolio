import { useEffect, useState } from 'react';

export default function Scramble({ text }: { text: string }) {
  const [value, setValue] = useState(text);
  useEffect(() => { const chars = '01<>/{}'; let step = 0; const timer = window.setInterval(() => { step += 1; setValue(text.split('').map((char, index) => index < step ? char : chars[Math.floor(Math.random() * chars.length)]).join('')); if (step >= text.length) window.clearInterval(timer); }, 35); return () => window.clearInterval(timer); }, [text]);
  return <span>{value}</span>;
}
