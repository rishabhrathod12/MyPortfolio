import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const DETAIL_PATH = '/projects/travelmate-ai'

const DETAIL_HEADINGS = [
  'Project Overview',
  'Problem Statement',
  'Key Features',
  'Technology Stack',
  'Architecture Overview',
  'Implementation Status',
  'Limitations and Future Scope',
  'GitHub Repository',
]

async function revealEverything(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(40)
  }
  await page.waitForTimeout(700)
  await page.evaluate(() => window.scrollTo(0, 0))
}

test.describe('main page shows cards only', () => {
  test('the project card has no feature, stack or architecture detail', async ({ page }) => {
    await page.goto('/#projects')
    const card = page.getByRole('article', { name: 'TravelMate AI' })
    await expect(card).toBeVisible()
    await expect(card.getByRole('img')).toBeVisible()
    await expect(card.getByRole('link', { name: 'View Details: TravelMate AI' })).toBeVisible()
    await expect(card.getByRole('link', { name: /TravelMate AI on GitHub/ })).toBeVisible()

    for (const heading of ['Key Features', 'Technology Stack', 'Architecture Overview']) {
      await expect(page.getByRole('heading', { name: heading })).toHaveCount(0)
    }
    await expect(page.getByText('LangGraph planning workflow')).toHaveCount(0)
    await expect(page.getByText('FastAPI layer')).toHaveCount(0)
  })

  test('the card image loads', async ({ page }) => {
    await page.goto('/#projects')
    const image = page.getByRole('article', { name: 'TravelMate AI' }).getByRole('img')
    await image.scrollIntoViewIfNeeded()
    const natural = await image.evaluate(async (el: HTMLImageElement) => {
      await el.decode()
      return el.naturalWidth
    })
    expect(natural).toBe(1200)
  })
})

test.describe('project details page', () => {
  test('View Details opens the page, with all sections in order', async ({ page }) => {
    await page.goto('/#projects')
    await page.getByRole('link', { name: 'View Details: TravelMate AI' }).click()

    await expect(page).toHaveURL(new RegExp(`${DETAIL_PATH}$`))
    await expect(page.getByRole('heading', { level: 1, name: 'TravelMate AI' })).toBeFocused()
    await expect(page).toHaveTitle('TravelMate AI | Rishabh Rathod')
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(50)

    const headings = await page.getByRole('heading', { level: 2 }).allTextContents()
    expect(headings).toEqual(DETAIL_HEADINGS)
  })

  test('shows implemented, prototype and planned work separately', async ({ page }) => {
    await page.goto(DETAIL_PATH)
    const status = page.getByRole('region', { name: 'Implementation Status' })
    await status.scrollIntoViewIfNeeded()
    for (const label of ['Implemented', 'Prototype', 'Planned']) {
      await expect(status.getByRole('list', { name: `${label} features` })).toBeVisible()
    }
    const planned = status.getByRole('list', { name: 'Planned features' })
    await expect(planned.getByText('Live AI model')).toBeVisible()
    const implemented = status.getByRole('list', { name: 'Implemented features' })
    await expect(implemented.getByText('Live AI model')).toHaveCount(0)
  })

  test('can be opened directly and reloaded', async ({ page }) => {
    await page.goto(DETAIL_PATH)
    await expect(page.getByRole('heading', { level: 1, name: 'TravelMate AI' })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('heading', { level: 1, name: 'TravelMate AI' })).toBeVisible()
  })

  test('Back to projects returns to the projects section', async ({ page }) => {
    await page.goto(DETAIL_PATH)
    await page.getByRole('link', { name: /Back to projects/ }).click()
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Featured Projects' })).toBeInViewport()
    await expect(page).toHaveTitle(/Rishabh Rathod \| AI Engineer/)
  })

  test('the browser back button returns to the main page', async ({ page }) => {
    await page.goto('/#projects')
    await page.getByRole('link', { name: 'View Details: TravelMate AI' }).click()
    await expect(page).toHaveURL(new RegExp(`${DETAIL_PATH}$`))
    await page.goBack()
    await expect(page).not.toHaveURL(new RegExp(DETAIL_PATH))
    await expect(page.getByRole('heading', { level: 1, name: 'Rishabh Rathod' })).toBeVisible()
    await page.goForward()
    await expect(page.getByRole('heading', { level: 1, name: 'TravelMate AI' })).toBeVisible()
  })

  test('navbar links lead back to home page sections', async ({ page }, testInfo) => {
    await page.goto(DETAIL_PATH)
    const isMobile = (testInfo.project.use.viewport?.width ?? 0) < 768
    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await page.getByRole('navigation', { name: 'Mobile' }).locator('a[href="/#skills"]').click()
    } else {
      await page.getByRole('navigation', { name: 'Primary' }).locator('a[href="/#skills"]').click()
    }
    await expect(page).toHaveURL(/\/#skills$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Technical Skills' })).toBeInViewport()
  })

  test('a modified click opens a new tab without being hijacked', async ({ page, context }) => {
    await page.goto('/#projects')
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page
        .getByRole('link', { name: 'View Details: TravelMate AI' })
        .click({ modifiers: ['Control'] }),
    ])
    await newPage.waitForLoadState()
    expect(newPage.url()).toContain(DETAIL_PATH)
    await expect(newPage.getByRole('heading', { level: 1, name: 'TravelMate AI' })).toBeVisible()
  })

  test('an unknown project address shows a not-found page', async ({ page }) => {
    await page.goto('/projects/does-not-exist')
    await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
    await page.getByRole('link', { name: 'Back to the portfolio' }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'Rishabh Rathod' })).toBeVisible()
  })

  test('has no console errors and no horizontal overflow', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') problems.push(m.text())
    })
    page.on('pageerror', (e) => problems.push(e.message))
    await page.goto(DETAIL_PATH)
    await revealEverything(page)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
    expect(problems).toEqual([])
  })

  test('has no WCAG A/AA violations', async ({ page }) => {
    await page.goto(DETAIL_PATH)
    await revealEverything(page)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const summary = results.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
    }))
    expect(summary).toEqual([])
  })

  test('captures a full-page screenshot of the details page', async ({ page }, testInfo) => {
    await page.goto(DETAIL_PATH)
    await revealEverything(page)
    await page.screenshot({
      path: testInfo.outputPath(`details-${testInfo.project.name}.png`),
      fullPage: true,
    })
  })
})
