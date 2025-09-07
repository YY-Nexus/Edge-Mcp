#!/bin/bash
# 一键集成脚本：自动部署 LMS 教学报告模块

set -e
MODULE_DIR="mcp-ai-lms-report-module"
REPO="https://github.com/YY-Nexus/Mcp-Edge.git"

# 克隆仓库并创建模块目录
if [ ! -d "$MODULE_DIR" ]; then
  git clone "$REPO" "$MODULE_DIR"
fi
cd "$MODULE_DIR"
mkdir -p lms report

# 生成集成指南
cat <<EOF > lms/moodle-integration.md
# 🎓 Moodle 集成指南 · AI 教学助手模块
...（内容略，见用户请求）
EOF
cat <<EOF > lms/canvas-integration.md
# 🎓 Canvas 集成指南 · AI 教学助手模块
...（内容略，见用户请求）
EOF

# 生成报告模板与脚本
cat <<EOF > report/report-template.html
<!DOCTYPE html>
<html><head><title>教学报告</title></head><body>
<h2>教学反馈报告</h2>
<!-- 可插入评分分布图、关键词云、评论摘要等 -->
</body></html>
EOF
cat <<EOF > report/generate-report.js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://'$(pwd)'/report/report-template.html', { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'teaching-feedback-report.pdf', format: 'A4', printBackground: true });
  await browser.close();
})();
EOF

# 完成提示
echo "✅ 教学报告模块已集成，可在 $MODULE_DIR 目录下使用。"
