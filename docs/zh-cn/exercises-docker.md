# 🐳 Docker 容器化实战任务清单

---

## 🎯 教学目标

- 理解容器与镜像的区别
- 掌握容器创建、挂载、端口映射
- 使用 Portainer 图形界面部署服务栈

---

## 🧪 实操任务

### 1. 拉取镜像

- 使用 Docker Manager 搜索并拉取 `nginx:alpine`
- 查看镜像详情与版本信息

### 2. 创建容器

- 创建容器 `nginx-demo`
- 映射端口 8080:80
- 挂载目录 `/mnt/md0/www/nginx` 到 `/usr/share/nginx/html`

### 3. 使用 Portainer 创建 Stack

```yaml
 version: '3.8'
 services:
 web:
 image: nginx:alpine
 ports:
 - "8080:80"
 volumes:
 - /mnt/md0/www/nginx:/usr/share/nginx/html
```

### 4. 验证部署

- 浏览器访问 `http://NAS_IP:8080`
- 查看网页是否正常加载

---

## 📦 拓展任务

- 构建自定义 Node.js 镜像并部署
- 使用 Webhook 实现自动更新
- 集成 Traefik 网关实现多服务路由
