const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + process.cwd() + '/assets/report-template.html', { waitUntil: 'networkidle0' });
  await page.pdf({ 
    path: 'teaching-feedback-report.pdf', 
    format: 'A4', 
    printBackground: true,
    margin: { top: '40px', bottom: '40px', left: '32px', right: '32px' },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:10px;text-align:right;width:100%;padding-right:32px;">Mcp-Edge 教学报告</div>',
    footerTemplate: '<div style="font-size:10px;text-align:center;width:100%;padding-bottom:16px;">第 <span class="pageNumber"></span> 页 / 共 <span class="totalPages"></span> 页</div>'
  });
  await browser.close();
})();
