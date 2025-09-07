import { test, expect } from '@playwright/test'

test('AI 聊天界面评分流程', async ({ page }) => {
  await page.goto('http://localhost:5173') // 假设前端用 Vite 启动
  await page.fill('textarea', '你好，AI！')
  await page.click('button:has-text("发送")')
  await page.waitForSelector('.response')
  await page.click('.rating span:nth-child(4)') // 评分 4 星
  await page.fill('textarea[placeholder*="评价"]', '回复很有帮助！')
  await page.click('button:has-text("提交评分")')
  await expect(page.locator('.feedback-msg')).toContainText('感谢')
})
