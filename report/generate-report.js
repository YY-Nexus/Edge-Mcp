const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/report/report-template.html', { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'teaching-feedback-report.pdf', format: 'A4', printBackground: true });
  await browser.close();
})();
