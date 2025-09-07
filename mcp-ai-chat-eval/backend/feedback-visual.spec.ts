import { test, expect } from '@playwright/test'

test('分组词云接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/keywords/grouped')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty('1')
  expect(body).toHaveProperty('5')
})

test('评论情感分析接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/sentiment')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(Array.isArray(body)).toBeTruthy()
  expect(body[0]).toHaveProperty('sentiment')
})

test('多维统计接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/stats/advanced')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty('ratingStats')
  expect(body).toHaveProperty('sentimentStats')
})
