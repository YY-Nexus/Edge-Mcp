# LMS 成绩册/证书集成说明

## Moodle 成绩册集成

1. 在评分 API 后端增加成绩同步接口（如 /api/feedback/grade），将评分结果推送至 Moodle Web Service。
2. 教师可在成绩册中查看学生评分与评论。
3. 可结合 Moodle Custom Certificate 插件，自动生成带分析的 PDF 证书。

## Canvas 成绩册集成

1. 通过 Canvas API，将评分结果同步到课程成绩册。
2. 支持自动发送成绩报告至学生邮箱。

## 示例接口设计

```js
// POST /api/feedback/grade
// body: { user, score, comment }
// 后端实现：调用 LMS API 推送成绩
```

## 自动化证书生成

- 推荐使用 LMS 插件（如 Moodle Custom Certificate）或 Node.js + Puppeteer 导出 PDF。
- 可在证书中嵌入评分分布图、学生评论摘要。
