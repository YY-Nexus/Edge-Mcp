import { test, expect } from '@playwright/test'

test('主题提取接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/topics')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(Array.isArray(body)).toBeTruthy()
  expect(body[0]).toHaveProperty('word')
})

test('评论聚类接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/clusters')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(typeof body).toBe('object')
})

test('细粒度情感分析接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/sentiment/fine')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(Array.isArray(body)).toBeTruthy()
  expect(body[0]).toHaveProperty('sentiment')
})
