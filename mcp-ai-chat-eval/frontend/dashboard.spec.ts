import { test, expect } from '@playwright/test'

test('关键词云接口', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback/keywords')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty('keywords')
})

test('评分趋势数据', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/feedback')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(Array.isArray(body)).toBeTruthy()
  expect(body[0]).toHaveProperty('rating')
  expect(body[0]).toHaveProperty('timestamp')
})

test('LMS 成绩同步接口', async ({ request }) => {
  const res = await request.post('http://localhost:3000/api/lms-grade/grade', {
    data: { user: 'student01', score: 95, comment: '优秀' }
  })
  expect(res.ok()).toBeTruthy()
})

test('Canvas 成绩同步接口', async ({ request }) => {
  const res = await request.post('http://localhost:3000/api/lms-grade/canvas-grade', {
    data: { user: 'student01', score: 95, comment: 'Excellent' }
  })
  expect(res.ok()).toBeTruthy()
})
