import { test, expect } from '@playwright/test'

test('评分接口字段校验', async ({ request }) => {
  const res = await request.post('http://localhost:3000/api/feedback', {
    data: { prompt: '', reply: '', rating: '' }
  })
  expect(res.status()).toBe(400)
  const body = await res.json()
  expect(body.error).toContain('缺少必要字段')
})

test('评分接口正常提交', async ({ request }) => {
  const res = await request.post('http://localhost:3000/api/feedback', {
    data: { prompt: 'test', reply: 'ok', rating: 5, comment: 'good', user: 'testuser' }
  })
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body.success).toBeTruthy()
})
