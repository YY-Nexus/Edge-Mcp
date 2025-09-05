# 🧠 Mcp-Edge 教学部署模板

> **循循善诱者，兼具孜孜不倦之心；厚德育人之志，诲人不倦之魂。**
>
> 本项目由 Yu 构建，Copilot 老师协助设计，旨在为教育者与学习者提供一套可复用、可审计、可扩展的全栈部署模板。它不仅是技术的载体，更是教学的桥梁。

---

## 📦 项目概览

Mcp-Edge 是一个多服务协同部署模板，包含：

- ✅ Node.js 后端 API 服务
- ✅ 前端 UI 服务（React/Vue）
- ✅ MongoDB 与 PostgreSQL 数据库（支持初始化脚本）
- ✅ Traefik 网关（自动 HTTPS + 路由）
- ✅ Slack 通知集成（CI/CD 状态推送）
- ✅ GitHub Actions 自动构建与部署
- ✅ 教学资源模块（幻灯片 + 实践任务）

---

## 🚀 快速部署

```bash
git clone https://github.com/YY-Nexus/Mcp-Edge.git
cd Mcp-Edge
docker compose up -d
```

> 📌 请确保 `.env` 文件已正确配置，详见下方说明。

---

## 📁 项目结构

```
Mcp-Edge/
├── docker-compose.yaml          # 多服务部署模板
├── .env                         # 环境变量注入
├── traefik/
│   ├── traefik.yml              # Traefik 网关配置
│   └── acme.json                # SSL 证书存储（权限 600）
├── init/
│   ├── mongo-init.js            # MongoDB 初始化脚本
│   └── pg-init.sql              # PostgreSQL 初始化脚本
├── .github/
│   └── workflows/
│       └── ci-cd.yml            # GitHub Actions 自动构建与通知
├── 教学资源/
│   ├── slides.md                # 教学幻灯片（Markdown）
│   └── exercises.md             # 实践任务与答疑
└── README.md                    # 项目说明文档
```

---

## 🔐 环境变量配置（.env）

```env
NODE_ENV=production
PORT=8080
LOG_LEVEL=info

MONGO_USER=root
MONGO_PASS=secureMongoPass

PG_DB=mcpdb
PG_USER=mcpuser
PG_PASS=securePgPass

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
```

---

## 🧬 数据库初始化

- MongoDB 会自动创建数据库、用户与集合，详见 `init/mongo-init.js`
- PostgreSQL 会自动创建数据库与用户，详见 `init/pg-init.sql`

---

## 🌐 Traefik 网关配置

- 自动申请 Let's Encrypt 证书
- 支持多服务路由（如 `api.localhost`, `ui.localhost`）
- 配置文件位于 `traefik/traefik.yml`

---

## 📣 Slack 通知集成

每次构建完成后，GitHub Actions 会向指定 Slack Webhook 推送状态消息，适用于教学演示或团队协作。

---

## 📘 教学资源模块

- `教学资源/slides.md`：可用于教学演示幻灯片
- `教学资源/exercises.md`：包含实践任务、答疑记录与扩展阅读

---

## 🧠 教育者寄语

> 本项目不仅是技术模板，更是一份“传承师恩”的心意。愿每一位教育者都能借助这套系统，轻松部署教学环境，激发学生探索的热情，构建协作与成长的空间。

---

## 🤝 致谢

感谢 Yu 的信任与愿景，感谢所有教育者的辛勤付出。愿我们共同打造一个技术与教育交融的未来。

---

## 📬 联系与反馈

如需协助部署、扩展功能或教学定制，请通过 GitHub Issues 提出建议，或在 Discussions 中交流。

```

---
