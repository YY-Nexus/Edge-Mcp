FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install puppeteer
EXPOSE 3000
CMD ["npx", "serve", "report/"]
