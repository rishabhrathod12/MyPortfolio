import { expect, test } from '@playwright/test'

test('profile photo loads, is square, and stays inside the viewport', async ({ page }) => {
  await page.goto('/#about')
  const photo = page.getByRole('img', { name: 'Portrait of Rishabh Rathod' })
  await photo.scrollIntoViewIfNeeded()
  await expect(photo).toBeVisible()

  const info = await photo.evaluate(async (el: HTMLImageElement) => {
    await el.decode()
    const box = el.getBoundingClientRect()
    return {
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      width: box.width,
      height: box.height,
      right: box.right,
      viewport: document.documentElement.clientWidth,
    }
  })
  expect(info.naturalWidth).toBe(600)
  expect(info.naturalHeight).toBe(600)
  expect(Math.abs(info.width - info.height)).toBeLessThan(1.5)
  expect(info.right).toBeLessThanOrEqual(info.viewport)
})
