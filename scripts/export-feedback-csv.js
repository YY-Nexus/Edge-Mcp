const fs = require('fs');
const path = require('path');

// 用法: node scripts/export-feedback-csv.js
function exportFeedbackCSV() {
  const feedbackPath = path.join(__dirname, '../report/feedback.json');
  if (!fs.existsSync(feedbackPath)) return console.error('未找到评分数据文件');
  const feedbacks = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
  const header = 'user_id,prompt,rating,comment,created_at\n';
  const rows = feedbacks.map(f => `${f.user_id},"${f.prompt}",${f.rating},"${f.comment}",${f.created_at}`);
  fs.writeFileSync(path.join(__dirname, '../report/feedback_export.csv'), header + rows.join('\n'));
  console.log('已导出评分数据到 report/feedback_export.csv');
}

if (require.main === module) {
  exportFeedbackCSV();
}
