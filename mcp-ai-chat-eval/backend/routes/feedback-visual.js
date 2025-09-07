const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const FEEDBACK_FILE = path.join(__dirname, '../database/feedback.json');

// 复杂词云（按评分分组，返回高频词）
router.get('/keywords/grouped', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json({});
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const result = {};
  [1,2,3,4,5].forEach(rating => {
    const comments = data.filter(f => Number(f.rating) === rating).map(f => f.comment || '').join(' ');
    const words = comments.split(/\s+|[，。,.!！?？\n]/).filter(w => w.length > 1);
    const freq = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    result[rating] = Object.entries(freq).filter(([k,v]) => v > 1).sort((a,b) => b[1]-a[1]);
  });
  res.json(result);
});

// 评论情感分析（简单版：正/负/中性）
router.get('/sentiment', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  // 简单规则：含“好”“棒”“满意”判为正，含“差”“不满”“失望”判为负，否则中性
  function analyze(text) {
    if (/好|棒|满意|喜欢|赞/.test(text)) return 'positive';
    if (/差|不满|失望|糟糕|问题/.test(text)) return 'negative';
    return 'neutral';
  }
  const result = data.map(f => ({ comment: f.comment, sentiment: analyze(f.comment || '') }));
  res.json(result);
});

// 多维统计（评分+情感分布）
router.get('/stats/advanced', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json({});
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const ratingStats = [1,2,3,4,5].map(n => data.filter(f => Number(f.rating) === n).length);
  const sentimentStats = { positive: 0, negative: 0, neutral: 0 };
  data.forEach(f => {
    const s = (/好|棒|满意|喜欢|赞/.test(f.comment || '')) ? 'positive'
      : (/差|不满|失望|糟糕|问题/.test(f.comment || '')) ? 'negative' : 'neutral';
    sentimentStats[s]++;
  });
  res.json({ ratingStats, sentimentStats });
});

module.exports = router;
