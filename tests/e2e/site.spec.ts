import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const SECTION_IDS = ['skills', 'projects', 'about', 'focus', 'experience', 'education', 'contact']

/** Scrolls the whole page so every scroll-reveal has played, then returns to the top. */
async function revealEverything(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(40)
  }
  await page.waitForTimeout(700)
  await page.evaluate(() => window.scrollTo(0, 0))
}

test.describe('page health', () => {
  test('loads without console errors, page errors or failed requests', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') {
        problems.push(`console ${message.type()}: ${message.text()}`)
      }
    })
    page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))
    page.on('requestfailed', (request) => problems.push(`request failed: ${request.url()}`))

    await page.goto('/')
    await revealEverything(page)
    expect(problems).toEqual([])
  })

  test('has the expected title, description and a single h1', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Rishabh Rathod/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /AI Engineer/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/')
    await revealEverything(page)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('keeps every section inside the viewport width', async ({ page }) => {
    await page.goto('/')
    const offenders = await page.evaluate(() => {
      const limit = document.documentElement.clientWidth + 1
      // Decorative (aria-hidden) elements such as the hero glow are clipped on purpose.
      return Array.from(document.querySelectorAll('main *'))
        .filter((el) => !el.closest('[aria-hidden="true"]'))
        .filter((el) => el.getBoundingClientRect().right > limit)
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80))
    })
    expect(offenders).toEqual([])
  })

  test('captures a full-page screenshot', async ({ page }, testInfo) => {
    await page.goto('/')
    await revealEverything(page)
    await page.screenshot({
      path: testInfo.outputPath(`full-page-${testInfo.project.name}.png`),
      fullPage: true,
    })
  })
})

test.describe('navigation', () => {
  test('shows the right navigation pattern for the viewport', async ({ page }, testInfo) => {
    await page.goto('/')
    const isMobile = (testInfo.project.use.viewport?.width ?? 0) < 768
    const primary = page.getByRole('navigation', { name: 'Primary' })
    const toggle = page.getByRole('button', { name: 'Open menu' })
    if (isMobile) {
      await expect(primary).toBeHidden()
      await expect(toggle).toBeVisible()
    } else {
      await expect(primary).toBeVisible()
      await expect(toggle).toBeHidden()
    }
  })

  test('every nav link scrolls its section into view', async ({ page }, testInfo) => {
    await page.goto('/')
    const isMobile = (testInfo.project.use.viewport?.width ?? 0) < 768
    for (const id of SECTION_IDS) {
      if (isMobile) {
        await page.getByRole('button', { name: 'Open menu' }).click()
        await page.getByRole('navigation', { name: 'Mobile' }).locator(`a[href="#${id}"]`).click()
        await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden()
      } else {
        await page.getByRole('navigation', { name: 'Primary' }).locator(`a[href="#${id}"]`).click()
      }
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      // The last section is short, so the page cannot scroll it to the top; check its heading is on screen.
      await expect(page.locator(`#${id} h2`)).toBeInViewport()
    }
  })

  test('scroll-spy marks the current section', async ({ page }, testInfo) => {
    test.skip((testInfo.project.use.viewport?.width ?? 0) < 768, 'desktop nav only')
    await page.goto('/')
    await page.locator('#education').scrollIntoViewIfNeeded()
    await page.evaluate(() => document.getElementById('education')?.scrollIntoView())
    await expect(
      page.getByRole('navigation', { name: 'Primary' }).locator('a[aria-current="true"]'),
    ).toHaveText('Education')
  })

  test('mobile menu closes with Escape and returns focus to the toggle', async ({
    page,
  }, testInfo) => {
    test.skip((testInfo.project.use.viewport?.width ?? 0) >= 768, 'mobile only')
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  })

  test('skip link is the first tab stop and jumps to main', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#main$/)
  })
})

test.describe('links and content', () => {
  test('external links are safe and no link is empty', async ({ page }) => {
    await page.goto('/')
    const links = await page.$$eval('a', (anchors) =>
      anchors.map((a) => ({
        href: a.getAttribute('href') ?? '',
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel') ?? '',
        name: (a.textContent ?? '').trim() || a.getAttribute('aria-label') || '',
      })),
    )
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link.name, `link ${link.href} needs an accessible name`).not.toBe('')
      if (link.href.startsWith('https://')) {
        expect(link.target).toBe('_blank')
        expect(link.rel).toContain('noopener')
      } else {
        expect(link.href).toMatch(/^(#\S+|\/projects\/[a-z0-9-]+)$/)
        if (link.href.startsWith('#')) {
          await expect(page.locator(link.href === '#top' ? 'section#top' : link.href)).toHaveCount(1)
        }
      }
    }
  })

  test('hero actions are reachable and the project showcase renders', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /View Projects/ })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Contact Me' })).toBeVisible()
    await page.getByRole('link', { name: /View Projects/ }).click()
    await expect(page.getByRole('heading', { name: 'TravelMate AI', level: 3 })).toBeVisible()
    await expect(page.getByRole('link', { name: /TravelMate AI on GitHub/ })).toBeVisible()
  })
})

test.describe('accessibility', () => {
  test('has no WCAG A/AA violations', async ({ page }) => {
    await page.goto('/')
    await revealEverything(page)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
    }))
    expect(summary).toEqual([])
  })

  test('respects reduced motion: content is visible without animation', async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', baseURL })
    const page = await context.newPage()
    await page.goto('/')
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView())
    await expect(page.getByRole('heading', { name: 'Get in touch' })).toBeVisible()
    await context.close()
  })
})
