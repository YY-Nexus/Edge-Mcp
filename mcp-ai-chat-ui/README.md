# 🤖 MCP AI Chat UI 组件

本资源包包含 Vue 3 与 React 版本的 AI 教学助手前端组件，以及独立 HTML 演示页面和教学文档，适用于教学演示、学生实验与框架对比。

## 目录结构

mcp-ai-chat-ui/
├── vue/Chat.vue
├── react/Chat.jsx
├── public/chat-ui.html
├── docs/chat.md
├── README.md

## 快速集成

- Vue 3 项目：将 `vue/Chat.vue` 复制到你的组件目录，按需引入。
- React 项目：将 `react/Chat.jsx` 复制到你的组件目录，按需引入。
- 独立演示：使用 `public/chat-ui.html` 或嵌入教学网站 iframe。

## 在线演示

在教学网站 `/chat.md` 页面嵌入：

```markdown
<iframe src="http://chat.localhost/chat-ui.html" width="100%" height="500" frameborder="0"></iframe>
```

## 教学建议

- 比较不同前端框架的实现方式
- 结合后端 AI 服务进行交互实验
- 记录与分析 AI 响应，优化提示词设计
