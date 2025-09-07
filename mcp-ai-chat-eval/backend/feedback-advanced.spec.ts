import { test, expect } from '@playwright/test'

test('分页与筛选接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/query?page=1&pageSize=2&user=student01')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty('total')
  expect(body).toHaveProperty('data')
})

test('评分统计接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/stats')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty('counts')
  expect(Array.isArray(body.counts)).toBeTruthy()
})
