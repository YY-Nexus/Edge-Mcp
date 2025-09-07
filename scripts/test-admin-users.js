// scripts/test-admin-users.js
const fetch = require('node-fetch');

async function testAdminUsers() {
  const base = process.env.API_BASE || 'http://localhost:3004/api';
  const token = process.env.ADMIN_TOKEN;
  if (!token) return console.error('请设置 ADMIN_TOKEN 环境变量');
  const res = await fetch(`${base}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('用户列表:', data);
}

if (require.main === module) {
  testAdminUsers();
}
