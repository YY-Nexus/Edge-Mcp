# mcp-auth Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3004
CMD ["node", "server.js"]
