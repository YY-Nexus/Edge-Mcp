---
marp: true
theme: default
paginate: true
---

# 🎓 Mcp-Edge Teaching Deployment Demo

> Technology as education, deployment as legacy

---

## 🧩 Project Overview

- Node.js backend API
- Frontend UI service
- MongoDB + PostgreSQL
- Traefik gateway (auto HTTPS)
- Slack notifications + GitHub Actions
- Teaching resource modules

---

## 🚀 Quick Deployment Demo

```bash
git clone https://github.com/YY-Nexus/Mcp-Edge.git
cd Mcp-Edge
docker compose up -d
```

---

## 🔐 Environment Variables

```env
NODE_ENV=production
PORT=8080
DB_USER=mcpuser
DB_PASS=securePass
```

---

## 🧬 Database Initialization Scripts

- MongoDB: `init/mongo-init.js`
- PostgreSQL: `init/pg-init.sql`

---

## 🌐 Traefik Gateway Configuration

- Auto SSL certificate
- Multi-service routing
- Config file: `traefik/traefik.yml`

---

## 🤖 AI Interaction Demo

- `/api/chat`: Prompt → Response
- Teaching prompts in `prompts.md`
- Extendable to healthcare, education, DevOps assistants

---

## 📣 Slack Notification Integration

- CI/CD build status push
- Webhook configured in `.env`

---

## 📘 Teaching Resource Modules

- `slides.md`: Teaching slides
- `exercises.md`: Practice tasks
- `lesson-plan.md`: Lesson plan
- `prompts.md`: AI prompt templates

---

## 🧠 Educator's Message

> May every educator use this system to deploy with ease, inspire exploration, and build a space for collaboration and growth.
