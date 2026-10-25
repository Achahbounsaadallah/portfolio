# Saad Achahboun -- Data & AI Engineer

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide React.

```bash
npm install
npm run dev      # développement
npm run build    # build de production
```

Project GitHub links are intentionally empty for now and fall back to Saad's profile. Fill each `githubUrl` in `src/sections/projectsData.ts` with the matching repository URL from [Saad's repositories](https://github.com/Achahbounsaadallah?tab=repositories).

## Technology Logos

Logos are loaded from Simple Icons, Devicon, and Iconify. To change a logo, edit its `slug`, `devicon`, `iconify`, or `color` in `src/sections/techData.ts`.

## Deploy

### Vercel

1. Import the repository in Vercel.
2. Set `VITE_SITE_URL`, `VITE_WEB3FORMS_KEY`, and `VITE_LINKEDIN_URL` in the project environment variables.
3. Deploy with the default build command, `npm run build`.

### Netlify

1. Add the repository as a new site in Netlify.
2. Use `npm run build` as the build command and `dist` as the publish directory.
3. Set the same `VITE_*` environment variables before deploying.
