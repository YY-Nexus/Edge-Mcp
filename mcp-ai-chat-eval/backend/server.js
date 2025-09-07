const express = require('express');
const bodyParser = require('body-parser');
const chatRouter = require('./routes/chat');
const feedbackRouter = require('./routes/feedback');
const feedbackAdvancedRouter = require('./routes/feedback-advanced');
const feedbackExtraRouter = require('./routes/feedback-extra');
const feedbackVisualRouter = require('./routes/feedback-visual');
const feedbackNlpRouter = require('./routes/feedback-nlp');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/chat', chatRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/feedback', feedbackAdvancedRouter);
app.use('/api/feedback', feedbackExtraRouter);
app.use('/api/feedback', feedbackVisualRouter);
app.use('/api/feedback', feedbackNlpRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
