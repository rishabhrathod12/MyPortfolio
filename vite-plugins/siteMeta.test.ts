import { describe, expect, it } from 'vitest'
import {
  OG_ALT,
  buildRobotsTxt,
  buildSitemapXml,
  injectSiteMeta,
  resolveSiteUrl,
} from './siteMeta'

const html =
  '<head>\n    <meta name="twitter:card" content="summary" />\n  </head><body></body>'

describe('resolveSiteUrl', () => {
  it('prefers SITE_URL and normalises it to an origin', () => {
    expect(resolveSiteUrl({ SITE_URL: 'https://example.dev/some/path/', VERCEL_PROJECT_PRODUCTION_URL: 'x.vercel.app' })).toBe(
      'https://example.dev',
    )
  })

  it('falls back to the Vercel production URL', () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'myportfolio.vercel.app' })).toBe(
      'https://myportfolio.vercel.app',
    )
  })

  it('returns undefined when nothing valid is set', () => {
    expect(resolveSiteUrl({})).toBeUndefined()
    expect(resolveSiteUrl({ SITE_URL: 'not a url' })).toBeUndefined()
    expect(resolveSiteUrl({ SITE_URL: 'http://insecure.example' })).toBeUndefined()
  })
})

describe('injectSiteMeta', () => {
  it('leaves the html untouched when the site URL is unknown', () => {
    expect(injectSiteMeta(html, undefined)).toBe(html)
  })

  it('describes the share image with the current positioning', () => {
    const out = injectSiteMeta(html, 'https://example.dev')
    expect(out).toContain(`property="og:image:alt" content="${OG_ALT}"`)
    for (const term of ['AI Engineer', 'Generative AI', 'Agentic AI', 'Machine Learning', 'Deep Learning']) {
      expect(OG_ALT).toContain(term)
    }
  })

  it('adds absolute canonical and social image tags when known', () => {
    const out = injectSiteMeta(html, 'https://example.dev')
    expect(out).toContain('<link rel="canonical" href="https://example.dev/" />')
    expect(out).toContain('property="og:url" content="https://example.dev/"')
    expect(out).toContain('property="og:image" content="https://example.dev/og-image.png"')
    expect(out).toContain('name="twitter:card" content="summary_large_image"')
    expect(out).not.toContain('content="summary"')
  })
})

describe('robots and sitemap', () => {
  it('only lists a sitemap when the site URL is known', () => {
    expect(buildRobotsTxt(undefined)).not.toMatch(/Sitemap/)
    expect(buildRobotsTxt('https://example.dev')).toContain('Sitemap: https://example.dev/sitemap.xml')
  })

  it('lists project pages in the sitemap', () => {
    const xml = buildSitemapXml('https://example.dev', '2026-10-30', [
      '/',
      '/projects/travelmate-ai',
    ])
    expect(xml).toContain('<loc>https://example.dev/</loc>')
    expect(xml).toContain('<loc>https://example.dev/projects/travelmate-ai</loc>')
  })

  it('builds a one-page sitemap', () => {
    const xml = buildSitemapXml('https://example.dev', '2026-10-30')
    expect(xml).toContain('<loc>https://example.dev/</loc>')
    expect(xml).toContain('<lastmod>2026-10-30</lastmod>')
  })
})
