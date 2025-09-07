const express = require('express');
const axios = require('axios');
const router = express.Router();

// LMS 成绩同步接口（Moodle/Canvas）


router.post('/grade', async (req, res) => {
  const { user, score, comment, certificate, extra } = req.body;
  // Moodle REST API 示例
  try {
    const moodleRes = await axios.post('https://your-moodle-domain/webservice/rest/server.php', null, {
      params: {
        wstoken: 'YOUR_MOODLE_TOKEN',
        wsfunction: 'core_grade_update_grades',
        moodlewsrestformat: 'json',
        user,
        score,
        comment,
        certificate,
        ...extra // 支持自定义参数扩展
      }
    });
    res.json({ success: true, moodle: moodleRes.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/canvas-grade', async (req, res) => {
  const { user, score, comment, certificate, extra } = req.body;
  try {
    const canvasRes = await axios.put(`https://canvas-domain/api/v1/courses/COURSE_ID/assignments/ASSIGNMENT_ID/submissions/${user}`, {
      submission: { posted_grade: score, comment, certificate, ...extra }
    }, {
      headers: { Authorization: 'Bearer YOUR_CANVAS_TOKEN' }
    });
    res.json({ success: true, canvas: canvasRes.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 自动生成证书 PDF（集成 PDFKit）
const { generateCertificatePDF } = require('../utils/certificate');
router.post('/certificate', async (req, res) => {
  const { user, score, comment } = req.body;
  try {
    const pdfPath = await generateCertificatePDF({ user, score, comment });
    res.json({ success: true, certificate: '/' + pdfPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
