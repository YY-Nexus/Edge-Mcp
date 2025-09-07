#!/bin/bash
# 一键部署 Docsify 教学网站到 GitHub Pages
set -e

REPO="YY-Nexus/Mcp-Edge"
BRANCH="main"
DOCS_DIR="docs"

# 检查 docs 目录
if [ ! -d "$DOCS_DIR" ]; then
  echo "❌ 未找到 docs 目录，终止部署。"
  exit 1
fi

echo "🚀 构建并推送 $DOCS_DIR 到 $REPO:$BRANCH..."
git add $DOCS_DIR
read -p "请输入部署提交说明: " msg
git commit -m "docs: 部署教学网站 $msg"
git push origin $BRANCH
echo "✅ 已推送到 $REPO:$BRANCH，稍后访问 GitHub Pages: https://yy-nexus.github.io/Mcp-Edge/"
