const express = require('express');
const router = express.Router();

// 假设这里调用 AI 服务，返回简单回显
router.post('/', async (req, res) => {
  const { prompt } = req.body;
  // 这里可集成 OpenAI、Baidu、Aliyun 等 AI 服务
  const reply = `AI 回复（模拟）：${prompt}`;
  res.json({ reply });
});

module.exports = router;
