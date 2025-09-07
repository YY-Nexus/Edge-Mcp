const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FEEDBACK_FILE = path.join(__dirname, '../database/feedback.json');

// 分页与筛选：/api/feedback/query?page=1&pageSize=10&user=student01&rating=5
router.get('/query', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json({ total: 0, data: [] });
  let data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const { page = 1, pageSize = 10, user, rating } = req.query;
  if (user) data = data.filter(f => f.user === user);
  if (rating) data = data.filter(f => String(f.rating) === String(rating));
  const total = data.length;
  const start = (page - 1) * pageSize;
  const end = start + Number(pageSize);
  res.json({ total, data: data.slice(start, end) });
});

// 评分统计：/api/feedback/stats
router.get('/stats', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json({});
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const stats = [1,2,3,4,5].map(n => data.filter(f => Number(f.rating) === n).length);
  res.json({ counts: stats });
});

module.exports = router;
