import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const siteUrl = process.env.VITE_SITE_URL || 'http://localhost:5173';
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 210"><defs><linearGradient id="g" x1="20" y1="20" x2="440" y2="190"><stop stop-color="#D7E2EA"/><stop offset=".55" stop-color="#B600A8"/><stop offset="1" stop-color="#BE4C00"/></linearGradient></defs><g fill="none" stroke="url(#g)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M112 50C106 24 44 20 40 55c-4 35 72 31 72 61 0 30-50 36-78 20"/><path d="M176 178 239 30l63 148M205 128h69M352 178V30h10c76 0 76 148 0 148h-10"/></g></svg>`;
const squareIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><linearGradient id="sa" x1="90" y1="100" x2="430" y2="430"><stop stop-color="#D7E2EA"/><stop offset=".7" stop-color="#D7E2EA"/><stop offset="1" stop-color="#D77BE0"/></linearGradient></defs><rect x="5" y="5" width="502" height="502" rx="112" fill="#0C0C0C" stroke="#761276" stroke-width="10"/><g fill="none" stroke="url(#sa)" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"><path d="M190 173c-4-50-99-45-99 12 0 61 128 43 128 143 0 71-116 86-173 42"/><path d="M202 378 318 112l116 266M250 293h128"/></g></svg>`;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="glow"><stop stop-color="#B600A8" stop-opacity=".35"/><stop offset="1" stop-color="#0C0C0C" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#0C0C0C"/><ellipse cx="930" cy="130" rx="430" ry="300" fill="url(#glow)"/><g transform="translate(70 190) scale(.65)">${logo.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 210">', '').replace('</svg>', '')}</g><text x="70" y="470" fill="#D7E2EA" font-family="Arial,sans-serif" font-size="52" font-weight="800" letter-spacing="8">SAAD ACHAHBOUN</text><text x="70" y="530" fill="#B600A8" font-family="Arial,sans-serif" font-size="28" letter-spacing="4">Data &amp; AI Engineer</text></svg>`;

await mkdir('public', { recursive: true });
const squarePng = await sharp(Buffer.from(squareIcon)).png().toBuffer();
await writeFile('public/favicon.svg', squareIcon);
await sharp(squarePng).resize(32, 32).toFile('public/icon-32.png');
await sharp(squarePng).resize(192, 192).toFile('public/icon-192.png');
await sharp(squarePng).resize(512, 512).toFile('public/icon-512.png');
await sharp(squarePng).resize(180, 180).toFile('public/apple-touch-icon.png');
const icoHeader = Buffer.from([0, 0, 1, 0, 1, 0]);
const icoEntry = Buffer.alloc(16); icoEntry[0] = 48; icoEntry[1] = 48; icoEntry[2] = 0; icoEntry[3] = 0; icoEntry[4] = 1; icoEntry[5] = 0; icoEntry[6] = 32; icoEntry[7] = 0; icoEntry.writeUInt32LE(squarePng.length, 8); icoEntry.writeUInt32LE(22, 12);
await writeFile('public/favicon.ico', Buffer.concat([icoHeader, icoEntry, squarePng]));
await sharp(Buffer.from(og)).png().toFile('public/og-image.png');
await writeFile('public/site.webmanifest', JSON.stringify({ name: 'Saad Achahboun -- Data & AI Engineer', short_name: 'Saad Achahboun', start_url: '/', display: 'standalone', background_color: '#0C0C0C', theme_color: '#0C0C0C', icons: [{ src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] }, null, 2));
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>`);
