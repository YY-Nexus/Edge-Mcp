#!/usr/bin/env node
// 批量上传报告到 /api/report/batch
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const argv = require('minimist')(process.argv.slice(2));
if (!argv.i || !argv.url) {
  console.log('用法: node scripts/batch-report-upload.js -i data.json -url http://localhost:3000/api/report/batch');
  process.exit(1);
}
const ext = path.extname(argv.i).toLowerCase();
let data;
if (ext === '.json') {
  data = JSON.parse(fs.readFileSync(argv.i, 'utf8'));
} else if (ext === '.csv') {
  const csv = fs.readFileSync(argv.i, 'utf8');
  const [header, ...rows] = csv.trim().split('\n');
  const keys = header.split(',');
  data = rows.map(row => {
    const values = row.split(',');
    return Object.fromEntries(keys.map((k, i) => [k.trim(), values[i].trim()]));
  });
} else {
  throw new Error('仅支持 JSON 或 CSV 输入');
}
axios.post(argv.url, data)
  .then(res => {
    console.log('✅ 批量上传成功:', res.data);
  })
  .catch(err => {
    console.error('❌ 上传失败:', err.response ? err.response.data : err.message);
  });
