---
marp: true
theme: default
paginate: true
---

# 🧬 数据路演 · 数据库初始化与后端连接

---

## 🎯 教学目标

- 使用 Adminer 管理数据库
- 创建数据表与用户权限
- 与 Node.js 后端服务连接验证

---

## 🧪 实操流程

### 1. 登录 Adminer

- 地址：`http://NAS_IP:5151/mysql/adminer`
- 用户名：`root`
- 数据库：`yunshu_db`

### 2. 创建数据表

```sql
CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50),
email VARCHAR(100)
);
```

### 3. 插入测试数据

```sql
INSERT INTO users (username, email) VALUES ('testuser', 'test@example.com');
```

### 4. 后端连接验证

- 配置 `.env` 文件
- 启动 Node.js 服务
- 测试 API 是否成功连接数据库

---

## 📦 拓展任务

- 创建视图与存储过程
- 使用 phpMyAdmin 导入 CSV 数据
- 配置 Duple Backup 实现数据备份
- 多语言数据库初始化（如 utf8mb4 支持、字段国际化设计）
- 智能评论聚类（如 KMeans、BERT 主题建模，支持中英文混合分析）
- Vue 仪表盘组件集成（评分分布、主题词云、情感饼图等可视化）
