const cron = require('node-cron');
const { exec } = require('child_process');

cron.schedule('0 2 * * *', () => {
  exec('node report/generate-report.js', (err, stdout, stderr) => {
    if (err) console.error('报告生成失败', err);
    else console.log('教学报告已生成');
  });
});
