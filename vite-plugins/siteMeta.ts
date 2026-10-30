import type { Plugin } from 'vite'

type Env = Record<string, string | undefined>

const OG_ALT = 'Rishabh Rathod, AI Engineer | Generative AI | Agentic AI'

/**
 * Works out the public site URL at build time. `SITE_URL` wins (custom domain); otherwise Vercel's
 * `VERCEL_PROJECT_PRODUCTION_URL` is used. Returns undefined when neither is a valid https URL,
 * so no wrong absolute URL is ever published.
 */
export function resolveSiteUrl(env: Env): string | undefined {
  const raw =
    env.SITE_URL?.trim() ||
    (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL.trim()}` : '')
  if (!raw) return undefined
  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:') return undefined
    return url.origin
  } catch {
    return undefined
  }
}

export function injectSiteMeta(html: string, siteUrl: string | undefined): string {
  if (!siteUrl) return html
  const tags = [
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${OG_ALT}" />`,
    `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
  ]
    .map((tag) => `    ${tag}`)
    .join('\n')
  return html
    .replace('<meta name="twitter:card" content="summary" />', '<meta name="twitter:card" content="summary_large_image" />')
    .replace('</head>', `${tags}\n  </head>`)
}

export function buildRobotsTxt(siteUrl: string | undefined): string {
  const lines = ['User-agent: *', 'Allow: /']
  if (siteUrl) lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
  return `${lines.join('\n')}\n`
}

export function buildSitemapXml(
  siteUrl: string,
  lastmod: string,
  paths: readonly string[] = ['/'],
): string {
  const urls = paths
    .map(
      (path) =>
        `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

/** `paths` are the page paths listed in the sitemap, for example ['/', '/projects/travelmate-ai']. */
export function siteMetaPlugin(env: Env = process.env, paths: readonly string[] = ['/']): Plugin {
  const siteUrl = resolveSiteUrl(env)
  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => injectSiteMeta(html, siteUrl),
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) })
      if (siteUrl) {
        const lastmod = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: buildSitemapXml(siteUrl, lastmod, paths),
        })
      }
    },
  }
}
