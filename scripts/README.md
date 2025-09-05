# 📁 仓库结构

mcp-server-deploy/
├── docker-compose.yaml       # Stack 部署配置
├── .env                      # 环境变量注入
├── README.md                 # 项目说明文档
└── .github/
    └── workflows/
        └── ci-cd.yml         # GitHub Actions 自动构建与部署

---

## 📦 docker-compose.yaml

```yaml
version: '3.8'

services:
  mcp-server:
    image: yanyuit/mcp-server:v2.0.1-20250906
    container_name: mcp-server
    ports:
      - "8080:8080"
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - ./logs:/app/logs
```

> ✅ 可直接用于 Portainer Stack 部署，支持 `.env` 注入与日志挂载。

---

## 🔐 .env 文件模板

```env
NODE_ENV=production
PORT=8080
LOG_LEVEL=info
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
```

> ✅ 与 `entrypoint.sh` 或 `dotenv` 配合使用，实现配置隔离与安全注入。

---

## 📄 README.md 示例

```markdown
# MCP Server Deployment

这是用于部署 `mcp-server` 的 Docker Compose 模板，支持 Portainer Stack、环境变量注入和日志挂载。

## 快速开始

```bash
git clone https://github.com/yanyuit/mcp-server-deploy.git
cd mcp-server-deploy
docker compose up -d
```

## 文件说明

- `docker-compose.yaml`：服务定义与端口映射
- `.env`：环境变量配置
- `logs/`：容器日志挂载目录

## Portainer Stack 部署

在 Portainer 中添加 Stack，选择 Git 仓库模式，填写：

- Repository URL: `https://github.com/yanyuit/mcp-server-deploy.git`
- Compose path: `docker-compose.yaml`

## GitHub Actions 支持

自动构建与部署见 `.github/workflows/ci-cd.yml`
```

---

## ⚙️ .github/workflows/ci-cd.yml

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker Image
        run: |
          docker buildx create --use
          docker buildx build \
            --platform linux/amd64 \
            -t yanyuit/mcp-server:v2.0.1-${{ github.run_number }} \
            --push .

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v0.1.7
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/mcp-server
            git pull origin main
            docker compose down
            docker compose up -d
```

---
# MCP Stack Template

包含 Traefik 网关、MongoDB、PostgreSQL、Node.js API 的多服务部署模板，支持自动 HTTPS、数据库初始化和配置注入。

## 快速部署

```bash
docker compose up -d
文件说明
traefik.yml：Traefik 静态配置

mongo-init.js：MongoDB 初始化脚本

init.sql：PostgreSQL 初始化脚本

.env：环境变量注入

# MCP Stack Deployment

多服务部署模板，包含 Traefik 网关、MongoDB、PostgreSQL、Node.js API 与 UI，支持自动 HTTPS、数据库初始化与 Slack 通知。

## 快速部署

```bash
docker compose up -d
文件说明
docker-compose.yaml：服务定义

.env：环境变量注入

traefik/：Traefik 配置与证书存储

init/：数据库初始化脚本

.github/workflows/ci-cd.yml：自动构建与通知