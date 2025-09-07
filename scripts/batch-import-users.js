// scripts/batch-import-users.js
const fs = require('fs');
const bcrypt = require('bcrypt');
const users = require('../mcp-auth/models/users');
const roles = require('../mcp-auth/models/roles');
const userRoles = require('../mcp-auth/models/user_roles');

async function importUsers(csvPath) {
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.split('\n').filter(Boolean);
  for (const line of lines) {
    const [email, password, role] = line.split(',');
    if (!email || !password || !role) continue;
    const exists = await users.findByEmail(email);
    if (exists) continue;
    const hash = await bcrypt.hash(password, 10);
    const userId = await users.create(email, hash);
    const roleId = await roles.getIdByName(role);
    await userRoles.bind(userId, roleId);
    console.log(`Imported: ${email} (${role})`);
  }
}

// 用法: node scripts/batch-import-users.js users.csv
if (require.main === module) {
  const csv = process.argv[2];
  if (!csv) return console.error('请指定CSV文件路径');
  importUsers(csv).then(() => console.log('批量导入完成'));
}
