import { expect, test } from '@playwright/test'

const EXPECTED_COLUMNS: Record<string, number> = { mobile: 1, tablet: 2, laptop: 4, desktop: 4 }

test.describe('skills grid', () => {
  test('uses the expected number of columns for the viewport', async ({ page }, testInfo) => {
    await page.goto('/#skills')
    const cards = page.locator('#skills ul[aria-label="Technical skills"] > li')
    await expect(cards).toHaveCount(20)
    const lefts = await cards.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().left)),
    )
    expect(new Set(lefts).size).toBe(EXPECTED_COLUMNS[testInfo.project.name])
  })

  test('cards have a consistent height within each row and stay on screen', async ({ page }) => {
    await page.goto('/#skills')
    const cards = page.locator('#skills ul[aria-label="Technical skills"] > li')
    const boxes = await cards.evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect()
        return { top: Math.round(r.top + window.scrollY), height: Math.round(r.height), right: r.right }
      }),
    )
    const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth)
    const rows = new Map<number, Set<number>>()
    for (const box of boxes) {
      expect(box.right).toBeLessThanOrEqual(viewportWidth)
      rows.set(box.top, (rows.get(box.top) ?? new Set()).add(box.height))
    }
    for (const heights of rows.values()) expect(heights.size).toBe(1)
  })

  test('shows a glow on hover', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'no hover on touch devices')
    await page.goto('/#skills')
    const card = page.locator('#skills ul[aria-label="Technical skills"] > li').first()
    await card.scrollIntoViewIfNeeded()
    await expect(card).toHaveCSS('box-shadow', 'none')
    await card.hover()
    await expect.poll(() => card.evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe('none')
  })
})
