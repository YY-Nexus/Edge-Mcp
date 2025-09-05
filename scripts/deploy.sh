#!/bin/bash
set -e

echo "📦 拉取最新代码..."
git pull origin main

echo "📦 安装依赖..."
npm install

echo "🚀 重启服务..."
pm2 restart server
