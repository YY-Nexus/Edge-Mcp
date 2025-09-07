#!/bin/bash
# 自动化导出教学报告 PDF
# 依赖：Node.js + Puppeteer

REPORT_URL="https://your-domain.com/report.html"
OUTPUT="teaching-report.pdf"

cat <<EOF > export-pdf.js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.REPORT_URL || REPORT_URL, { waitUntil: 'networkidle0' });
  await page.pdf({ path: process.env.OUTPUT || OUTPUT, format: 'A4' });
  await browser.close();
})();
EOF

node export-pdf.js
rm export-pdf.js
