# MCP Stack Template

包含 Traefik 网关、MongoDB、PostgreSQL、Node.js API 的多服务部署模板，支持自动 HTTPS、数据库初始化和配置注入。

## 快速部署

```bash
docker compose up -d
```

## 文件说明

- traefik.yml：Traefik 静态配置
- mongo-init.js：MongoDB 初始化脚本
- init.sql：PostgreSQL 初始化脚本
- .env：环境变量注入
