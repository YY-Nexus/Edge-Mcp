# mcp-server 独立部署模板

本目录为 mcp-server 独立部署与本地构建推送模板，适用于 Portainer、TOS/NAS 等环境。

## 目录结构

```plaintext
mcp-server-standalone/
├── Makefile              # 本地构建与推送自动化
├── docker-compose.yaml   # 部署模板
├── .env                 # 环境变量模板
├── config.yaml          # 服务配置示例
├── logs/                # 日志挂载目录（需手动创建）
└── README.md            # 说明文档
```

## 快速部署
详见 Makefile 与 docker-compose.yaml。
