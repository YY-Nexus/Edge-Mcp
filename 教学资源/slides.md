---
marp: true
theme: default
paginate: true
---

# 🎓 Mcp-Edge 教学部署演示

> 技术即教育，部署即传承

---

## 🧩 项目概览

- Node.js 后端 API
- 前端 UI 服务
- MongoDB + PostgreSQL
- Traefik 网关（自动 HTTPS）
- Slack 通知 + GitHub Actions
- 教学资源模块

---

## 🚀 快速部署演示

```bash
git clone https://github.com/YY-Nexus/Mcp-Edge.git
cd Mcp-Edge
docker compose up -d
```

---

## 🔐 环境变量注入

```env
NODE_ENV=production
PORT=8080
DB_USER=mcpuser
DB_PASS=securePass
```

---

## 🧬 数据库初始化脚本

- MongoDB: `init/mongo-init.js`
- PostgreSQL: `init/pg-init.sql`

---

## 🌐 Traefik 网关配置

- 自动申请 SSL
- 多服务路由支持
- 配置文件：`traefik/traefik.yml`

---

## 🤖 AI 交互接口演示

- `/api/chat`：提示词 → 回复
- 教学提示词见 `prompts.md`
- 可扩展为医疗、教育、运维助手

---

## 📣 Slack 通知集成

- CI/CD 构建完成后自动推送
- Webhook 配置在 `.env`

---

## 📘 教学资源模块

- `slides.md`：教学幻灯片
- `exercises.md`：实践任务
- `prompts.md`：AI提示词模板

---

## 🧠 教育者寄语

> 愿每一位教育者都能借助这套系统，轻松部署教学环境，激发学生探索的热情，构建协作与成长的空间。
