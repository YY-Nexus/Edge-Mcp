// routes/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../models/users');
const roles = require('../models/roles');
const userRoles = require('../models/user_roles');
const JWT_SECRET = process.env.JWT_SECRET || 'mcp-edge-secret';

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: '参数缺失' });
  const exists = await users.findByEmail(email);
  if (exists) return res.status(409).json({ error: '邮箱已注册' });
  const hash = await bcrypt.hash(password, 10);
  const userId = await users.create(email, hash);
  const roleId = await roles.getIdByName(role);
  await userRoles.bind(userId, roleId);
  const token = jwt.sign({ id: userId, email, role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, role });
});

module.exports = router;
