# Mcp-Edge 智能教学平台 · 部署与自动化集成要点

## 1. 一键部署架构
- Docker Compose 管理 Node.js/Express（API）、MariaDB（数据库）、Nginx（反代+静态站点+HTTPS）
- 支持 NAS、公网、备案域名、SSL 证书热插拔
- 环境变量集中于 `.env`/`backend/.env`，安全友好
- 目录结构：
  - `docker-compose.yml`：一键编排
  - `nginx.conf`：反代与 HTTPS
  - `certs/`：SSL 证书
  - `docs/`：Docsify 教学网站
  - `mcp-ai-chat-eval/backend/`：Node.js 源码

## 2. 主要操作流程
1. 配置 `.env` 和证书（`certs/`）
2. `docker compose up -d` 一键启动
3. 访问平台：
   - 教学网站：http(s)://你的域名/
   - API：http(s)://你的域名/api/
   - 数据库：MariaDB 3306
4. 管理容器：Portainer/NAS 控制台
5. 数据库管理：phpMyAdmin

## 3. 自动化与扩展建议
- 定时备份：结合 NAS/CloudSync/Centralized Backup，定期备份 `db_data` 卷和 `docs/` 目录
- 自动证书续期：推荐 acme.sh/Certbot，证书更新后重载 Nginx
- API 日志分析：Nginx access.log/error.log + Node.js 日志，支持 ELK/Prometheus 集成
- CI/CD：GitHub Actions 自动部署 Docsify 静态站点到 Pages
- 批量数据导入：`scripts/batch-report-upload.js` 支持 JSON/CSV 批量上传
- API 鉴权：JWT，主入口挂载鉴权中间件

## 4. 典型集成场景
- 纯 Docker：一键部署、升级、迁移、备份
- 混合：Node.js 容器+已有数据库/Nginx
- 云端/分布式：多节点统一反代、备份、监控

## 5. 关键文件与脚本
- `docker-compose.yml`、`nginx.conf`、`.env`、`certs/`
- `backend/db.js`：数据库连接
- `backend/routes/report.js`：API 路由
- `scripts/generate-report.js`：自动生成报告
- `scripts/batch-report-upload.js`：批量导入
- `scripts/package-docs.sh`：一键打包 Docsify
- `scripts/test-report-api.http`：前后端联调示例

## 6. 常见问题与建议
- 证书未配置可先用 http，建议尽快申请免费证书
- 数据库数据持久化在 `db_data` 卷
- 端口/域名自定义，修改 `.env` 和 `nginx.conf`
- 备份/恢复建议用 NAS 自带工具或 CloudSync

---
如需进一步自动化（定时任务、日志分析、API 扩展等），可随时扩展脚本与配置。
