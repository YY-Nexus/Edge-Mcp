// 教学反馈报告 API
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const REPORTS_FILE = path.join(__dirname, '../../data/reports.json');

// 确保数据目录存在
function ensureFile() {
  if (!fs.existsSync(REPORTS_FILE)) {
    fs.mkdirSync(path.dirname(REPORTS_FILE), { recursive: true });
    fs.writeFileSync(REPORTS_FILE, '[]');
  }
}

// POST /api/report  提交单份报告
router.post('/', (req, res) => {
  ensureFile();
  const report = req.body;
  const reports = JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf8'));
  reports.push({ ...report, createdAt: new Date().toISOString() });
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
  res.json({ success: true });
});

// POST /api/report/batch  批量导入报告
router.post('/batch', (req, res) => {
  ensureFile();
  const batch = req.body; // 应为数组
  if (!Array.isArray(batch)) return res.status(400).json({ error: 'Batch must be array' });
  const reports = JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf8'));
  batch.forEach(r => reports.push({ ...r, createdAt: new Date().toISOString() }));
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
  res.json({ success: true, count: batch.length });
});

// GET /api/report  获取所有报告
router.get('/', (req, res) => {
  ensureFile();
  const reports = JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf8'));
  res.json(reports);
});

module.exports = router;
