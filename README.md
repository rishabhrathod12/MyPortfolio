# Rishabh Rathod: AI Engineer Portfolio

Personal portfolio site for Rishabh Rathod (AI Engineer | Generative AI | Agentic AI).
A static single-page app. There is no backend, no database and no API keys.

**Stack:** React 19, TypeScript (strict), Vite, Tailwind CSS v4, Motion for React, Lucide React.
**Tests:** Vitest and Testing Library (unit), Playwright and axe-core (browser, responsive, accessibility).

## Quick start

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev        # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint (includes accessibility rules) |
| `npm run typecheck` | `tsc -b` over app, build scripts and e2e tests |
| `npm test` | Unit and component tests |
| `npm run test:e2e` | Browser tests at 360, 768, 1024 and 1440 px (see below) |
| `npm run check` | Lint, typecheck, unit tests and build in one go |
| `npm run check:links` | Verify every external link the site publishes |

The first time you run the browser tests, install the browser: `npx playwright install chromium`.

## Editing content

All copy lives in `src/data/`, separate from the components. Edit data, not JSX.

| File | Content |
|---|---|
| `profile.ts` | Name, title, location, hero intro, About text, contact message, social links |
| `skills.ts` | The approved skill list (name and icon key) |
| `experience.ts` | Professional experience |
| `education.ts` | Education |
| `focus.ts` | Technical focus and areas of interest |
| `projects.ts` | Each project: card text (`shortDescription`, `highlights`), and detail-page content (features, stack, architecture, status notes, limitations) |
| `nav.ts` | Navigation items (each `id` must match a section `id`) |

### Content rules

The site is deliberately honest. `src/data/data.test.ts` and `projects.test.ts` fail if:

- an email address, certification, revenue figure or engineering branch appears;
- the site mentions YouTube, courses, "self-taught", "self-directed" or "aspiring" wording, or the About text mentions the Amazon business;
- a feature the repository lists as not built (live model, live data, authentication) is marked `implemented`;
- a project gets a `demoUrl` that is not real.

### Keeping the TravelMate AI section accurate

That repository changes quickly. Before changing a feature status in `projects.ts`, read the repository's
`docs/PROJECT_CONTEXT.md` and recent commits, then update `lastReviewed`. Only mark something `implemented`
when the repository says it is built and tested. Add `demoUrl` only when a public demo exists.

### Adding a project

1. Add an entry to `src/data/projects.ts`. Its `id` becomes the address: `/projects/<id>`.
2. Add a 1200 x 675 cover image to `src/assets/projects/` and map it in `src/components/project/covers.ts`.
3. The main page shows only the card (name, cover, `shortDescription`, `highlights`, GitHub and View Details). Everything else appears only on the project's own page.

Project pages use a small History-API router (`src/lib/router.ts`), with no extra dependency. `vercel.json` rewrites every path to `index.html` so a direct visit or reload of `/projects/<id>` works. The sitemap lists each project page automatically.

### Profile photo

The portrait is `src/assets/profile.jpg` (600 x 600, shown in the About section; alt text is `photoAlt` in `profile.ts`). To change it, replace that file with a square, metadata-free image. Crop out event badges, QR codes and backgrounds before publishing. Originals dropped in the project root (`my_picture*`) are git-ignored.

### Not added yet

- **Resume:** put the PDF in `public/` (for example `public/Rishabh-Rathod-Resume.pdf`) and add a link in the hero and contact sections.
- **Public email:** deliberately not shown. Add it to `contact` in `profile.ts` and render a `mailto:` link if you change your mind.

## Project structure

```
src/
  components/
    icons/     GitHub and LinkedIn SVGs (Lucide has no brand icons)
    layout/    Navbar, MobileMenu, Footer, SkipLink
    project/   Project card, feature list, architecture diagram, cover images
    ui/        Section, Container, GlassCard, Badge, StatusBadge, Button, Reveal
  data/        All content and its tests
  hooks/       useScrollSpy, usePageMeta
  lib/         cn, formatIsoDate, router
  pages/       ProjectDetailPage, NotFoundPage
  sections/    Hero, Skills, Projects, About, Focus, Experience, Education, Contact
  types/       Shared TypeScript types
tests/e2e/     Playwright specs
vite-plugins/  Build-time site metadata (canonical URL, Open Graph, sitemap)
scripts/       check-links.mjs
```

## Testing

- **Unit and component:** `npm test`. Covers navigation behaviour, every section rendering its data, link safety, and the content-honesty rules.
- **Browser:** `npm run test:e2e` builds the site, serves it with `vite preview`, and runs against four viewports. It checks console errors, horizontal overflow, navigation and scroll-spy, the mobile menu, the skip link, link safety, axe WCAG A/AA scans, reduced motion, and that the site works under the exact security headers in `vercel.json`. Screenshots are written to `test-results/` (git-ignored).
- **CI:** `.github/workflows/ci.yml` runs lint, typecheck, unit tests, build and the browser tests on every push and pull request.

## Deployment (GitHub and Vercel)

The repository is `rishabhrathod12/MyPortfolio`. Vercel deploys it automatically from `main`.

1. Push the code to GitHub (`git push origin main`).
2. In Vercel, choose **Add New, Project** and import `MyPortfolio`.
3. Vercel detects Vite. `vercel.json` already sets the build command (`npm run build`) and output directory (`dist`). Leave the defaults and click **Deploy**.
4. From then on, every push to `main` deploys to production, and every pull request gets a preview URL.

No environment variables are required.

### Site URL, Open Graph and sitemap

The canonical URL, `og:url`, `og:image` and `sitemap.xml` need the public address. The build gets it automatically:

- On Vercel, from `VERCEL_PROJECT_PRODUCTION_URL` (enabled by default under **Settings, Environment Variables, Automatically expose System Environment Variables**).
- With a **custom domain**, set `SITE_URL=https://your-domain.example` in Vercel project settings and redeploy.

If neither is available the build leaves those tags out and publishes `robots.txt` without a sitemap line.
It never writes a guessed address. The value is public and is not a secret.

### Security headers

`vercel.json` sets a Content-Security-Policy, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
and `Permissions-Policy`, and long-term caching for hashed assets. `style-src` allows `'unsafe-inline'` because
Motion sets inline `style` attributes on animated elements. If you add third-party scripts, images or fonts,
extend the policy and run `npm run test:e2e` to confirm nothing is blocked.

## Secrets

This project holds no credentials and calls no APIs. `.env` files are git-ignored. `.env.example` lists the one optional, public setting.
