#!/bin/bash
# 一键打包 Docsify 教学模块与配置
cd "$(dirname "$0")"
zip -r mcp-edge-docsify-modules.zip docs/ docsify.json
