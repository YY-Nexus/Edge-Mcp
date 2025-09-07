#!/bin/sh
set -e

echo "🔧 加载环境变量..."
export $(grep -v '^#' .env | xargs)

echo "📁 初始化日志目录..."
mkdir -p /app/logs
touch /app/logs/server.log

echo "🔌 初始化数据库连接..."
# 可扩展为 MongoDB/PostgreSQL 连接验证

echo "🤖 启动 MCP AI 服务..."
exec node server.js >> /app/logs/server.log 2>&1
