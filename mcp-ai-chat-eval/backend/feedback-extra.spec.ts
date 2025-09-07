import { test, expect } from '@playwright/test'

test('评论关键词接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/keywords')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty('keywords')
})

test('导出 CSV 接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/export')
  expect(res.ok()).toBeTruthy()
  expect(res.headers()['content-type']).toContain('csv')
})
