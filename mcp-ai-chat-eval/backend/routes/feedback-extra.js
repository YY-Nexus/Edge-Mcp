const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const FEEDBACK_FILE = path.join(__dirname, '../database/feedback.json');

// 评论关键词统计
router.get('/keywords', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json({});
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const allComments = data.map(f => f.comment || '').join(' ');
  // 简单分词（中文/英文混合，真实项目可用分词包）
  const words = allComments.split(/\s+|[，。,.!！?？\n]/).filter(w => w.length > 1);
  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  // 只返回出现次数大于1的关键词
  const keywords = Object.entries(freq).filter(([k,v]) => v > 1).sort((a,b) => b[1]-a[1]);
  res.json({ keywords });
});

// 导出 CSV
router.get('/export', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.send('No data');
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const header = 'timestamp,prompt,reply,rating,comment,user\n';
  const rows = data.map(f => [f.timestamp, f.prompt, f.reply, f.rating, f.comment, f.user].map(x => '"'+String(x).replace(/"/g,'""')+'"').join(',')).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=feedback.csv');
  res.send(header + rows);
});

module.exports = router;
