const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const FEEDBACK_FILE = path.join(__dirname, '../database/feedback.json');

// 评论主题提取（简单 TF-IDF 关键词聚类）
router.get('/topics', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const comments = data.map(f => f.comment || '').filter(Boolean);
  // 词频统计
  const freq = {};
  comments.forEach(text => {
    text.split(/\s+|[，。,.!！?？\n]/).forEach(w => {
      if (w.length > 1) freq[w] = (freq[w] || 0) + 1;
    });
  });
  // 选取高频词作为主题（真实项目可用 NLP 包）
  const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]);
  const topics = sorted.slice(0, 10).map(([word,count]) => ({ word, count }));
  res.json(topics);
});

// 评论聚类（按主题词分组）
router.get('/clusters', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  const comments = data.map(f => f.comment || '').filter(Boolean);
  // 取高频词作为聚类中心
  const freq = {};
  comments.forEach(text => {
    text.split(/\s+|[，。,.!！?？\n]/).forEach(w => {
      if (w.length > 1) freq[w] = (freq[w] || 0) + 1;
    });
  });
  const centers = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,5).map(([w])=>w);
  // 按中心词分组
  const clusters = {};
  centers.forEach(center => clusters[center] = []);
  comments.forEach(text => {
    centers.forEach(center => {
      if (text.includes(center)) clusters[center].push(text);
    });
  });
  res.json(clusters);
});

// 更细粒度情感分析（正/负/中性/建议/疑问）
router.get('/sentiment/fine', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  function analyze(text) {
    if (/建议|希望|可以|应该/.test(text)) return 'suggestion';
    if (/吗|？|如何|能否/.test(text)) return 'question';
    if (/好|棒|满意|喜欢|赞/.test(text)) return 'positive';
    if (/差|不满|失望|糟糕|问题/.test(text)) return 'negative';
    return 'neutral';
  }
  const result = data.map(f => ({ comment: f.comment, sentiment: analyze(f.comment || '') }));
  res.json(result);
});

module.exports = router;
