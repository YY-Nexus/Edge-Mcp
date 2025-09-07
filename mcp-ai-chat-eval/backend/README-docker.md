# 一键 Docker Compose 部署指南（Mcp-Edge 教学平台）

## 步骤

1. 配置环境变量
   - 编辑 `mcp-ai-chat-eval/backend/.env`，设置数据库、JWT 密钥等
2. 准备 SSL 证书
   - 将 `fullchain.pem` 和 `privkey.pem` 放入 `certs/` 目录
   - 没有证书可先跳过，80 端口可用 http 访问
3. 启动服务
   ```bash
   docker compose up -d
   ```
4. 访问平台
   - 教学网站：http(s)://你的域名/
   - API 接口：http(s)://你的域名/api/
   - 数据库：MariaDB，端口 3306，用户名/密码见 .env

## 目录说明
- `docker-compose.yml`：一键编排 Node.js、MariaDB、Nginx
- `nginx.conf`：反向代理与静态站点配置
- `certs/`：SSL 证书目录
- `docs/`：Docsify 教学网站内容
- `mcp-ai-chat-eval/backend/`：Node.js/Express 源码

## 常见问题
- 证书未配置可先用 http 访问，建议尽快申请免费证书（如 Let’s Encrypt）
- 数据库数据持久化在 `db_data` 卷
- 如需自定义端口、域名，修改 `docker-compose.yml` 和 `nginx.conf`
