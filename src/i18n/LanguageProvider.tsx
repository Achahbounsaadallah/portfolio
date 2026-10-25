import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en, type Dictionary } from './en';
import { fr } from './fr';

export type Language = 'en' | 'fr';
export type TranslationKey =
  | `nav.${keyof Dictionary['nav'] & string}`
  | `hero.${keyof Dictionary['hero'] & string}`
  | `about.${keyof Dictionary['about'] & string}`
  | `projects.${Exclude<keyof Dictionary['projects'], 'data'> & string}`
  | `github.${keyof Dictionary['github'] & string}`
  | `contact.${Exclude<keyof Dictionary['contact'], 'starters' | 'starterMessages'> & string}`
  | `footer.${keyof Dictionary['footer'] & string}`
  | `optional.${keyof Dictionary['optional'] & string}`
  | `seo.${keyof Dictionary['seo'] & string}`;
type ContextValue = { language: Language; setLanguage: (language: Language) => void; dictionary: Dictionary; t: (key: TranslationKey) => string };
const LanguageContext = createContext<ContextValue | null>(null);

function getInitialLanguage(): Language { try { const stored = localStorage.getItem('saad-language'); if (stored === 'fr' || stored === 'en') return stored; } catch { /* storage can be unavailable */ } return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'; }
function getValue(dictionary: Dictionary, key: string) { return key.split('.').reduce<unknown>((value, part) => (value as Record<string, unknown>)[part], dictionary) as string; }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const dictionary = language === 'fr' ? fr : en;
  const setLanguage = (next: Language) => { setLanguageState(next); try { localStorage.setItem('saad-language', next); } catch { /* storage can be unavailable */ } };
  useEffect(() => { document.documentElement.lang = language; document.title = language === 'fr' ? 'Saad Achahboun -- Ingénieur Data & IA' : 'Saad Achahboun -- Data & AI Engineer'; const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env; const siteUrl = env.VITE_SITE_URL || window.location.origin; document.querySelector('link[rel="canonical"]')?.setAttribute('href', siteUrl); document.querySelector('meta[property="og:url"]')?.setAttribute('content', siteUrl); document.querySelector('meta[property="og:image"]')?.setAttribute('content', `${siteUrl}/og-image.png`); document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', `${siteUrl}/og-image.png`); document.querySelector('meta[name="description"]')?.setAttribute('content', dictionary.seo.description); document.querySelector('meta[property="og:description"]')?.setAttribute('content', dictionary.seo.description); document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'fr' ? 'fr_FR' : 'en_US'); }, [language, dictionary]);
  const value = useMemo(() => ({ language, setLanguage, dictionary, t: (key: TranslationKey) => getValue(dictionary, key) }), [language, dictionary]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() { const context = useContext(LanguageContext); if (!context) throw new Error('useT must be used inside LanguageProvider'); return context; }
