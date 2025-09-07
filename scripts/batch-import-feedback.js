const fs = require('fs');
const path = require('path');

// 用法: node scripts/batch-import-feedback.js feedback.csv
async function importFeedback(csvPath) {
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.split('\n').filter(Boolean);
  const feedbacks = [];
  for (const line of lines) {
    const [user_id, prompt, rating, comment] = line.split(',');
    if (!user_id || !prompt || !rating) continue;
    feedbacks.push({ user_id: Number(user_id), prompt, rating: Number(rating), comment });
  }
  fs.writeFileSync(path.join(__dirname, '../report/feedback.json'), JSON.stringify(feedbacks, null, 2));
  console.log('批量评分数据已导入到 report/feedback.json');
}

if (require.main === module) {
  const csv = process.argv[2];
  if (!csv) return console.error('请指定CSV文件路径');
  importFeedback(csv);
}
