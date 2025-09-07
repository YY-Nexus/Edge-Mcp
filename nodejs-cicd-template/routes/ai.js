const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/aiService');

router.post('/chat', async (req, res) => {
  const { prompt, context } = req.body;
  try {
    const reply = await generateResponse(prompt, context);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'AI 生成失败' });
  }
});

module.exports = router;
