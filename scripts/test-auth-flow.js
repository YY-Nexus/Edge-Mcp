// scripts/test-auth-flow.js
const fetch = require('node-fetch');

async function testRegisterAndLogin() {
  const base = process.env.API_BASE || 'http://localhost:3004/api/auth';
  const email = 'testuser@mcp.com';
  const password = 'test123';
  const role = 'student';

  // 注册
  let res = await fetch(`${base}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  });
  let data = await res.json();
  console.log('注册:', data);

  // 登录
  res = await fetch(`${base}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  data = await res.json();
  console.log('登录:', data);
}

if (require.main === module) {
  testRegisterAndLogin();
}
