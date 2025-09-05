# MCP Server Node.js CI/CD 模板

本项目为 TOS/NAS/Portainer 环境设计，支持自动化构建、测试、部署、版本标签和数据库集成。

## 目录结构

```plaintext
nodejs-cicd-template/
├── .github/workflows/main.yml   # CI/CD 工作流
├── scripts/deploy.sh           # 远程部署脚本
├── .env                        # 环境变量模板
├── Makefile                    # 本地构建与推送
├── package.json                # Node.js 依赖与元信息
├── server.js                   # 服务入口
└── README.md                   # 项目说明
```

## 快速开始

1. 配置 .env
2. make build && make push
3. 推送到主分支自动触发 CI/CD

## 数据库集成示例

### MySQL

已集成 mysql2 和 dotenv，可在 server.js 中这样使用：

```js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  });
  const [rows] = await conn.query('SELECT 1');
  console.log('MySQL 连接成功:', rows);
  await conn.end();
}
main().catch(console.error);
```

### MongoDB

需安装 `mongodb` 依赖：

```bash
npm install mongodb

示例代码：

```js
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
  const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('test');
  const col = db.collection('demo');
  const count = await col.countDocuments();
  console.log('MongoDB 连接成功，demo 集合文档数:', count);
  await client.close();
}
main().catch(console.error);
```

### PostgreSQL

需安装 `pg` 依赖：

```bash
npm install pg

```

示例代码：

```js
require('dotenv').config();
const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'postgres'
  });
  await client.connect();
  const res = await client.query('SELECT NOW()');
  console.log('PostgreSQL 连接成功:', res.rows);
  await client.end();
}
main().catch(console.error);
```

---
如需更多数据库或高级用法示例，请随时告知！
