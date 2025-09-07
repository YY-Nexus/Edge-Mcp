#!/usr/bin/env node
/**
 * 批量/单份教学反馈报告自动生成脚本
 * 用法：
 *   node scripts/generate-report.js -i data.json -o report.md [--pdf] [--batch]
 *   支持输入 JSON/CSV，输出 Markdown 或 PDF（需安装 puppeteer）
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const argv = require('minimist')(process.argv.slice(2));
if (!argv.i || !argv.o) {
  console.log('用法: node scripts/generate-report.js -i data.json -o report.md [--pdf] [--batch]');
  process.exit(1);
}

function parseData(inputFile) {
  const ext = path.extname(inputFile).toLowerCase();
  if (ext === '.json') {
    return JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  } else if (ext === '.csv') {
    const csv = fs.readFileSync(inputFile, 'utf8');
    const [header, ...rows] = csv.trim().split('\n');
    const keys = header.split(',');
    return rows.map(row => {
      const values = row.split(',');
      return Object.fromEntries(keys.map((k, i) => [k.trim(), values[i].trim()]));
    });
  } else {
    throw new Error('仅支持 JSON 或 CSV 输入');
  }
}

function genMarkdown(data, lang = 'zh') {
  // data: 单个对象或对象数组
  const isBatch = Array.isArray(data);
  const arr = isBatch ? data : [data];
  return arr.map((item, idx) => {
    const title = lang === 'zh' ? '📊 教学反馈报告' : '📊 Teaching Feedback Report';
    const quote1 = lang === 'zh' ? '> 万象归元于云枢丨深栈启智新纪元' : '> All Realms Converge at Cloud Nexus, DeepStack Ignites a New Era';
    const quote2 = lang === 'zh' ? '> 万象归元于云枢丨深栈启智新纪元' : '> All Realms Converge at Cloud Nexus, DeepStack Ignites a New Era';
    const summary = lang === 'zh' ? `- 平均评分：${item.avg || '-'}
- 高评分提示词：${item.high || '-'}
- 低评分提示词：${item.low || '-'}` : `- Average score: ${item.avg || '-'}
- High-rated prompts: ${item.high || '-'}
- Low-rated prompts: ${item.low || '-'}`;
    const advice = lang === 'zh' ? (item.advice || '-').split(';').map(a => `- ${a}`).join('\n') : (item.advice_en || '-').split(';').map(a => `- ${a}`).join('\n');
    const comments = (item.comments || []).map(c => `> ${c}`).join('\n');
    return `# ${title}\n\n${quote1}\n\n## 评分分布\n\n${item.chart ? `![评分分布图](${item.chart})` : ''}\n\n## 学生评论摘要\n\n${comments}\n\n## 教学总结\n\n${summary}\n\n## 优化建议\n\n${advice}\n\n${quote2}\n`;
  }).join('\n---\n');
}

async function mdToPdf(mdFile, pdfFile) {
  const html = execSync(`npx marked ${mdFile}`, { encoding: 'utf8' });
  const style = `
    <style>
      body { font-family: 'Segoe UI', 'Noto Sans SC', sans-serif; max-width: 800px; margin: 40px auto; background: #f9f9f9; padding: 40px; }
      h1, h2 { color: #2c3e50; }
      blockquote { color: #42b983; border-left: 4px solid #42b983; padding-left: 12px; margin: 16px 0; font-size: 1.1em; background: #eef; }
      ul { margin: 12px 0 12px 24px; }
      li { margin-bottom: 6px; }
      .comment-box { background: #eef; padding: 10px; border-radius: 6px; margin-top: 10px; }
    </style>
  `;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(style + html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfFile, format: 'A4', printBackground: true });
  await browser.close();
}

(async () => {
  const data = parseData(argv.i);
  const lang = argv.lang || 'zh';
  const md = genMarkdown(data, lang);
  fs.writeFileSync(argv.o, md);
  console.log('✅ 已生成 Markdown 报告:', argv.o);
  if (argv.pdf) {
    const pdfFile = argv.o.replace(/\.md$/, '.pdf');
    await mdToPdf(argv.o, pdfFile);
    console.log('✅ 已生成 PDF 报告:', pdfFile);
  }
})();
