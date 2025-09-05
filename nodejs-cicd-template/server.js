// Node.js 多数据库自动切换服务示例（含连接池、错误处理、多环境配置、ORM入口）
require('dotenv').config({ path: process.env.ENV_FILE || '.env' });
const http = require('http');

// 多环境配置示例
const ENV = process.env.NODE_ENV || 'development';
const config = {
  port: process.env.PORT || 8080,
  dbType: (process.env.DB_TYPE || 'mysql').toLowerCase(),
  mysql: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'testdb',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT || 27017,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    db: process.env.MONGO_DB || 'test',
  },
  pg: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB || 'test',
    max: 5,
    idleTimeoutMillis: 10000
  }
};


// ========== 分环境配置示例 ==========
const fs = require('fs');
const envFile = process.env.ENV_FILE || `.env.${ENV}`;
if (fs.existsSync(envFile)) {
  require('dotenv').config({ path: envFile, override: true });
}

// ========== 日志分级 ==========
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
function log(level, ...args) {
  const levels = ['error', 'warn', 'info', 'debug'];
  if (levels.indexOf(level) <= levels.indexOf(LOG_LEVEL)) {
    console[level === 'debug' ? 'log' : level](...args);
  }
}

// ========== ORM 示例 ==========
// Sequelize（MySQL/PostgreSQL）
async function testSequelize() {
  const { Sequelize } = require('sequelize');
  let sequelize;
  if (config.dbType === 'mysql') {
    sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
      host: config.mysql.host,
      port: config.mysql.port,
      dialect: 'mysql',
      logging: msg => log('debug', msg)
    });
  } else if (config.dbType === 'pg' || config.dbType === 'postgresql') {
    sequelize = new Sequelize(config.pg.database, config.pg.user, config.pg.password, {
      host: config.pg.host,
      port: config.pg.port,
      dialect: 'postgres',
      logging: msg => log('debug', msg)
    });
  } else {
    return 'Sequelize 仅支持 MySQL/PostgreSQL';
  }
  try {
    await sequelize.authenticate();
    await sequelize.close();
    return `Sequelize ORM 连接成功 [${config.dbType}]`;
  } catch (e) {
    return `Sequelize ORM 连接失败: ${e.message}`;
  }
}

// Mongoose（MongoDB）
async function testMongoose() {
  if (config.dbType !== 'mongodb' && config.dbType !== 'mongo') return 'Mongoose 仅支持 MongoDB';
  const mongoose = require('mongoose');
  const uri = `mongodb://${config.mongo.user}:${config.mongo.pass}@${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`;
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    await mongoose.disconnect();
    return 'Mongoose ORM 连接成功 [MongoDB]';
  } catch (e) {
    return `Mongoose ORM 连接失败: ${e.message}`;
  }
}


async function testDb() {
  try {
    let msg = '';
    if (config.dbType === 'mysql') {
      const mysql = require('mysql2/promise');
      const pool = mysql.createPool(config.mysql);
      const [rows] = await pool.query('SELECT 1 AS result');
      await pool.end();
      msg += `MySQL 连接成功: ${JSON.stringify(rows)}\n`;
      msg += await testSequelize() + '\n';
    } else if (config.dbType === 'mongodb' || config.dbType === 'mongo') {
      const { MongoClient } = require('mongodb');
      const uri = `mongodb://${config.mongo.user}:${config.mongo.pass}@${config.mongo.host}:${config.mongo.port}`;
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
      await client.connect();
      const db = client.db(config.mongo.db);
      const count = await db.collection('demo').countDocuments();
      await client.close();
      msg += `MongoDB 连接成功，demo 集合文档数: ${count}\n`;
      msg += await testMongoose() + '\n';
    } else if (config.dbType === 'postgresql' || config.dbType === 'pg') {
      const { Pool } = require('pg');
      const pool = new Pool(config.pg);
      const res = await pool.query('SELECT NOW()');
      await pool.end();
      msg += `PostgreSQL 连接成功: ${JSON.stringify(res.rows)}\n`;
      msg += await testSequelize() + '\n';
    } else {
      msg += '未识别的 DB_TYPE，支持 mysql/mongodb/pg';
    }
    return msg;
  } catch (err) {
    log('error', err);
    return `数据库连接失败: ${err.message}`;
  }
}

http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  let msg = `MCP Server Running!\n环境: ${ENV}\n`;
  msg += await testDb();
  res.end(msg + '\n');
}).listen(config.port, () => {
  log('info', `Server running at http://localhost:${config.port}/ [${ENV}]`);
});
