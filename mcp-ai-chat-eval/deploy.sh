#!/bin/bash
set -e

echo "🚀 Building and starting AI Chat + Evaluation service..."

# Build backend image
cd backend
if [ -f package.json ]; then npm install; fi
cd ..
docker build -t mcp-ai-chat-eval ./backend

docker run -d --name mcp-ai-chat-eval -p 3004:3004 --env-file ./backend/.env -v $(pwd)/database:/app/database mcp-ai-chat-eval

echo "✅ Service started at http://localhost:3004"
