const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FEEDBACK_FILE = path.join(__dirname, '../database/feedback.json');

// 评分统计接口
router.get('/', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  res.json(data);
});

module.exports = router;
