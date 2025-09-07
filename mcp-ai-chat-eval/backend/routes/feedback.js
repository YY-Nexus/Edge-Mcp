const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, '../database/feedback.json');

// 查询所有评分
router.get('/', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  res.json(data);
});

// 提交评分
router.post('/', (req, res) => {
  const { prompt, reply, rating, comment, user } = req.body;
  if (!prompt || !reply || !rating) {
    return res.status(400).json({ error: '缺少必要字段' });
  }

  const feedback = {
    timestamp: new Date().toISOString(),
    prompt,
    reply,
    rating,
    comment: comment || '',
    user: user || 'anonymous'
  };

  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  data.push(feedback);
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(data, null, 2));

  res.json({ success: true });
});
