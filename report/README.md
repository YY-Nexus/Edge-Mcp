# 教学报告模块 · MCP Edge Report PDF Module

本模块用于自动化生成教学反馈报告 PDF，支持评分分布图、评论摘要与中英双语切换。

## 目录结构

report/
├── report-template.html  # 教学报告页面模板
├── generate-report.js    # PDF 生成脚本
├── feedback.json         # 示例评分数据

docs/
├── zh-cn/modules/analysis-report.md
├── zh-cn/modules/report-template.md
├── en/modules/analysis-report.md

## 使用方法

1. 启动本地静态服务（如 `npx serve report/`）
2. 运行 `node report/generate-report.js` 自动生成 PDF
3. 可在 Docsify 教学模块中嵌入报告链接与图表

## 可选容器化部署

见 Dockerfile 示例，可一键部署至云端

---
如需扩展数据源、定时任务或LMS联动，请联系管理员。
