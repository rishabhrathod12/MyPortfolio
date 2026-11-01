import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const PATH = '/projects/apex-knowledge-assistant'

test.describe('Apex Knowledge Assistant', () => {
  test('has a card on the main page that opens its details page', async ({ page }) => {
    await page.goto('/#projects')
    const card = page.getByRole('article', { name: 'Apex Knowledge Assistant' })
    await expect(card).toBeVisible()
    await card.getByRole('link', { name: /View Details/ }).click()
    await expect(page).toHaveURL(new RegExp(`${PATH}$`))
    await expect(page.getByRole('heading', { level: 1, name: 'Apex Knowledge Assistant' })).toBeFocused()
  })

  test('loads every screenshot, with no console errors and no horizontal overflow', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') problems.push(m.text())
    })
    page.on('pageerror', (e) => problems.push(e.message))
    await page.goto(PATH)

    const gallery = page.getByRole('region', { name: 'Screenshots' })
    const images = gallery.getByRole('img')
    await expect(images).toHaveCount(16)
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded()
      const width = await image.evaluate(async (el: HTMLImageElement) => {
        await el.decode()
        return el.naturalWidth
      })
      expect(width).toBe(1200)
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
    expect(problems).toEqual([])
  })

  test('has no WCAG A/AA violations', async ({ page }) => {
    await page.goto(PATH)
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y <= height; y += 500) {
      await page.evaluate((top) => window.scrollTo(0, top), y)
      await page.waitForTimeout(40)
    }
    await page.waitForTimeout(700)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      results.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
      })),
    ).toEqual([])
  })
})
