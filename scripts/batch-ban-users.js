// scripts/batch-ban-users.js
const fs = require('fs');
const users = require('../mcp-auth/models/users');

async function batchBan(csvPath) {
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.split('\n').filter(Boolean);
  for (const line of lines) {
    const [email] = line.split(',');
    if (!email) continue;
    await users.banByEmail(email);
    console.log(`封禁: ${email}`);
  }
}

// 用法: node scripts/batch-ban-users.js banlist.csv
if (require.main === module) {
  const csv = process.argv[2];
  if (!csv) return console.error('请指定CSV文件路径');
  batchBan(csv).then(() => console.log('批量封禁完成'));
}
