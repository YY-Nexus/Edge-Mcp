-- roles.sql
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(32) UNIQUE NOT NULL
);

INSERT INTO roles (name) VALUES ('student'), ('instructor'), ('admin')
  ON DUPLICATE KEY UPDATE name=VALUES(name);
