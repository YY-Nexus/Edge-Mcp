#!/bin/bash
# 一键打包 Docsify 教学网站为 ZIP 教案
set -e
zip -r mcp-edge-docsify-site.zip docs/
echo "✅ 已生成 mcp-edge-docsify-site.zip，可上传至 GitHub Releases 或 LMS。"
