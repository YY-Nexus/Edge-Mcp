-- users.sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 管理员账户（bcrypt加密密码）
INSERT INTO users (email, password) VALUES
  ('admin@mcp-edge.local', '$2b$10$eW5uYXBwZWRwYXNzd29yZC5oYXNoZWQ=')
  ON DUPLICATE KEY UPDATE password=VALUES(password);
