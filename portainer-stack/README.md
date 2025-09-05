# Portainer Stack 多服务部署模板

本目录为 Portainer Stack 设计的多服务部署模板，支持数据库、缓存、API 网关和 Node.js 服务协同运行。

## 目录结构

portainer-stack/
├── docker-compose.yaml   # Stack 主配置
├── .env                 # 环境变量模板
├── nginx.conf           # API 网关配置
└── README.md            # 说明文档

## 快速部署

详见 docker-compose.yaml 与上级文档说明。
