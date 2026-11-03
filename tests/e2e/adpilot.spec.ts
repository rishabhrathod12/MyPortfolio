import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const PATH = '/projects/adpilot-ai'

async function revealEverything(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
}

test.describe('AdPilot AI details page', () => {
  test('renders, with honest status and no demo link', async ({ page }) => {
    await page.goto(PATH)
    await expect(page.getByRole('heading', { level: 1, name: 'AdPilot AI' })).toBeVisible()
    await expect(page.getByText(/MOCK/).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /live demo/i })).toHaveCount(0)
    await expect(page.locator('a[href="https://github.com/rishabhrathod12/AI-Ads-Autopilot"]').first()).toBeVisible()
  })

  test('has no console errors and no horizontal overflow', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') problems.push(m.text())
    })
    page.on('pageerror', (e) => problems.push(e.message))
    await page.goto(PATH)
    await revealEverything(page)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
    expect(problems).toEqual([])
  })

  test('has no WCAG A/AA violations', async ({ page }) => {
    await page.goto(PATH)
    await revealEverything(page)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      results.violations.map((v) => ({ id: v.id, targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) })),
    ).toEqual([])
  })

  test('captures a full-page screenshot', async ({ page }, testInfo) => {
    await page.goto(PATH)
    await revealEverything(page)
    await page.screenshot({ path: testInfo.outputPath(`adpilot-${testInfo.project.name}.png`), fullPage: true })
  })
})
