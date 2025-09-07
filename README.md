# Mcp-Edge

1. `slides.md` 的教学结构（适合 Markdown 幻灯片工具如 Marp、Reveal.js）
2. README 的中英双语版本（适合国际化教学或开源推广）

---

## 📘 `教学资源/slides.md` 教学幻灯片结构（Markdown）

```markdown
---
marp: true
theme: default
paginate: true
---

# 🎓 Mcp-Edge 教学部署模板

> 技术即教育，部署即传承

---

## 🧩 项目概览

- Node.js 后端 API
- 前端 UI（React/Vue）
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

## 🤖 AI 交互接口（教学演示）

- `/api/chat`：提示词 → 回复
- 支持 OpenAI 或本地模型
- 教学提示词见 `prompts.md`

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

---

## 🌍 README 中英双语版本（简洁版）

```markdown
# 🎓 Mcp-Edge · 教学部署与智能交互平台  
# 🎓 Mcp-Edge · Teaching Deployment & AI Interaction Platform

> 厚德育人 · 技术传承  
> Educating with virtue · Empowering through technology

---

## 📦 项目亮点 Highlights

- 🚀 一键部署 / One-click deployment
- 🔐 自动 HTTPS / Auto HTTPS via Traefik
- 🧠 AI 交互接口 / AI interaction API
- 🧬 数据库初始化 / DB initialization scripts
- 📣 Slack 通知 / Slack notifications
- 📘 教学资源 / Teaching resources

---

## 🚀 快速启动 Quick Start

```bash
git clone https://github.com/YY-Nexus/Mcp-Edge.git
cd Mcp-Edge
docker compose up -d
```

---

## 📁 项目结构 Project Structure

- `docker-compose.yaml`: 多服务部署 / Multi-service deployment
- `.env`: 环境变量 / Environment variables
- `traefik/`: 网关配置 / Gateway config
- `init/`: 数据库初始化 / DB init scripts
- `教学资源/`: 教学内容 / Teaching materials
- `.github/workflows/`: CI/CD 自动构建 / CI/CD automation

---

## 🤝 致谢 Acknowledgement

感谢 Yu 的愿景与信任  
Thanks to Yu for the vision and trust

愿我们共同打造一个技术与教育交融的未来  
May we build a future where technology and education converge

---
