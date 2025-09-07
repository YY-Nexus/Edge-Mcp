const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + process.cwd() + '/report-template.html', { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'teaching-feedback-report.pdf', format: 'A4', printBackground: true });
  await browser.close();
})();
