# Portainer 部署文档

## 步骤一：构建并推送镜像
- 推送代码到 GitHub，CI/CD 自动构建并推送到 DockerHub

## 步骤二：在 Portainer 导入 Stack
1. 登录 Portainer
2. 进入 Stacks，点击 Add Stack
3. 选择 Git Repository 或上传 `docker-compose.yaml`
4. 设置环境变量（如 JWT_SECRET）
5. 部署 Stack，服务自动启动

## 步骤三：Traefik 路由与 SSL
- 确保 Traefik 已配置 websecure entrypoint 和证书自动续期
- 访问 `https://auth.mcp-edge.local` 验证服务

## 步骤四：前后端联调
- Next.js 前端 `.env` 设置 `NEXT_PUBLIC_API_BASE=https://auth.mcp-edge.local`
- 登录页面调用 `/api/auth/login`，获取 JWT 并跳转角色视图

## 常见问题
- 容器未启动：检查端口、环境变量、镜像是否最新
- 登录失败：检查 JWT_SECRET 是否一致，数据库连接是否正常
- Traefik 路由异常：检查 labels 配置和证书状态

---
如需自动化脚本或远程协助，请联系平台管理员。
