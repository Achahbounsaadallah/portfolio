import { useEffect, useState } from 'react';
import type { Tech } from '../sections/techData';

type TechLogoProps = Pick<Tech, 'name' | 'slug' | 'devicon' | 'iconify' | 'color'>;

const resolvedSources = new Map<string, string>();

function initials(name: string) {
  const words = name.replace(/[.#-]/g, ' ').trim().split(/\s+/);
  return (words.length > 1 ? words.map((word) => word[0]).join('') : name.slice(0, 2)).toUpperCase().slice(0, 2);
}

function luminance(hex: string) {
  const channels = [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255).map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function fallbackSource(name: string, color: string) {
  const foreground = luminance(color) > 0.52 ? '#0C0C0C' : '#FFFFFF';
  const label = initials(name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#${color}"/><stop offset="1" stop-color="#${color}" stop-opacity=".55"/></linearGradient></defs><rect width="120" height="120" rx="24" fill="url(#g)"/><text x="60" y="67" text-anchor="middle" dominant-baseline="middle" fill="${foreground}" font-family="Kanit,Arial,sans-serif" font-size="34" font-weight="900">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function TechLogo({ name, slug, devicon, iconify, color }: TechLogoProps) {
  const sources = [
    slug ? `https://cdn.simpleicons.org/${slug}/${color}` : null,
    devicon ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}.svg` : null,
    iconify ? `https://api.iconify.design/${iconify.replace(':', '/')}.svg` : null,
    fallbackSource(name, color),
  ].filter((source): source is string => Boolean(source));
  const cacheKey = `${name}:${color}`;
  const [sourceIndex, setSourceIndex] = useState(() => {
    const cached = resolvedSources.get(cacheKey);
    return cached ? Math.max(0, sources.indexOf(cached)) : 0;
  });

  useEffect(() => {
    const cached = resolvedSources.get(cacheKey);
    if (cached) setSourceIndex(Math.max(0, sources.indexOf(cached)));
  }, [cacheKey, sources]);

  const source = sources[sourceIndex] ?? sources[sources.length - 1];
  return <img src={source} width={72} height={72} alt={name} loading="lazy" decoding="async" referrerPolicy="no-referrer" draggable={false} onLoad={() => resolvedSources.set(cacheKey, source)} onError={() => setSourceIndex((current) => Math.min(current + 1, sources.length - 1))} className="h-full w-full object-contain" />;
}
