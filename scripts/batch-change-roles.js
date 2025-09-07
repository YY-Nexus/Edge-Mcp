// scripts/batch-change-roles.js
const fs = require('fs');
const users = require('../mcp-auth/models/users');
const roles = require('../mcp-auth/models/roles');
const userRoles = require('../mcp-auth/models/user_roles');

async function batchChangeRoles(csvPath) {
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.split('\n').filter(Boolean);
  for (const line of lines) {
    const [email, newRole] = line.split(',');
    if (!email || !newRole) continue;
    const user = await users.findByEmail(email);
    if (!user) continue;
    const roleId = await roles.getIdByName(newRole);
    await userRoles.bind(user.id, roleId);
    console.log(`角色变更: ${email} -> ${newRole}`);
  }
}

// 用法: node scripts/batch-change-roles.js changeroles.csv
if (require.main === module) {
  const csv = process.argv[2];
  if (!csv) return console.error('请指定CSV文件路径');
  batchChangeRoles(csv).then(() => console.log('批量角色变更完成'));
}
