// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [
  { email: 'teacher@mcp.com', password: 'teach123', role: 'instructor' },
  { email: 'admin@mcp.com', password: 'admin123', role: 'admin' },
  { email: 'student@mcp.com', password: 'stu123', role: 'student' }
];

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role, expires: new Date(Date.now() + 86400000).toISOString() });
});

app.get('/api/auth/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET);
    res.json({ email: payload.email, role: payload.role });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3004, () => console.log('Auth server running on 3004'));
