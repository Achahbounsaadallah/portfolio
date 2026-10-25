// Set VITE_LINKEDIN_URL when Saad's LinkedIn profile URL is available.
const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/saad-allah-achahboun-727041316/?isSelfProfile=true';

export const EMAIL = 'achahbounsaadallah@gmail.com';
export const GITHUB_URL = 'https://github.com/Achahbounsaadallah';

export const certifications: { name: string; issuer: string; year: string; url?: string }[] = [];
export const recommendations: { quote: string; author: string; role: string }[] = [];
