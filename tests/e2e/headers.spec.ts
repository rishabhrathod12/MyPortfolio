import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

interface VercelHeaderRule {
  source: string
  headers: { key: string; value: string }[]
}

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8')) as { headers: VercelHeaderRule[] }
const globalHeaders = Object.fromEntries(
  (vercel.headers.find((rule) => rule.source === '/(.*)')?.headers ?? []).map((h) => [
    h.key.toLowerCase(),
    h.value,
  ]),
)

test('the site works under the exact security headers from vercel.json', async ({ page }) => {
  expect(globalHeaders['content-security-policy']).toBeTruthy()

  // `vite preview` ignores vercel.json, so apply the same headers to every response here.
  await page.route('**/*', async (route) => {
    const response = await route.fetch()
    await route.fulfill({ response, headers: { ...response.headers(), ...globalHeaders } })
  })

  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(error.message))

  await page.goto('/')
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView())
  await page.getByRole('link', { name: /View Projects/ }).click()
  await expect(page.getByRole('heading', { name: 'TravelMate AI', level: 3 })).toBeVisible()

  // Fonts and styles must still load, and Motion's inline styles must not be blocked.
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily)
  expect(font).toContain('Inter Variable')
  expect(problems.filter((text) => /content security policy|refused/i.test(text))).toEqual([])
  expect(problems).toEqual([])
})
