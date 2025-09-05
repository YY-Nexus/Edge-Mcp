#!/bin/sh

set -e  # 出错即退出，确保构建安全性

echo "🔧 加载环境变量..."
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
  echo "✅ .env 加载完成"
else
  echo "⚠️ 未找到 .env 文件，使用默认环境变量"
fi

echo "📁 初始化日志目录..."
mkdir -p /app/logs
touch /app/logs/server.log

echo "🚀 启动 Node.js 服务..."
exec node server.js >> /app/logs/server.log 2>&1
