const express = require('express');
const axios = require('axios');
const router = express.Router();

// Moodle 成绩同步接口（示例）
router.post('/grade', async (req, res) => {
  const { user, score, comment } = req.body;
  // Moodle REST API 示例
  try {
    const response = await axios.post('https://your-moodle-domain/webservice/rest/server.php', null, {
      params: {
        wstoken: 'YOUR_MOODLE_TOKEN',
        wsfunction: 'core_grade_update_grades',
        moodlewsrestformat: 'json',
        // 具体参数见 Moodle API 文档
        user,
        score,
        comment
      }
    });
    res.json({ success: true, moodle: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Canvas 成绩同步接口（示例）
router.post('/canvas-grade', async (req, res) => {
  const { user, score, comment } = req.body;
  try {
    const response = await axios.put(`https://canvas-domain/api/v1/courses/COURSE_ID/assignments/ASSIGNMENT_ID/submissions/${user}`, {
      submission: { posted_grade: score, comment }
    }, {
      headers: { Authorization: 'Bearer YOUR_CANVAS_TOKEN' }
    });
    res.json({ success: true, canvas: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
