const PDFDocument = require('pdfkit');
const fs = require('fs');


function generateCertificatePDF({ user, score, comment }) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 40 });
    const filePath = `certificates/${user}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    // 页眉
    doc.fontSize(10).fillColor('#888').text('Mcp-Edge 教学平台 · 证书', { align: 'right' });
    doc.moveDown(2);
    // 标题
    doc.fontSize(28).fillColor('#2c3e50').text('教学优秀证书', { align: 'center' });
    doc.moveDown();
    // 主体
    doc.fontSize(16).fillColor('#222').text(`学生姓名：${user}`);
    doc.text(`成绩评分：${score}`);
    doc.text(`教师评语：${comment}`);
    doc.text(`颁发日期：${new Date().toLocaleDateString()}`);
    doc.moveDown(2);
    // 签名区
    doc.fontSize(14).fillColor('#888').text('教师签名：__________________', { align: 'right' });
    // 页脚
    doc.fontSize(10).fillColor('#888').text('Mcp-Edge 教学平台自动生成', 40, 780, { align: 'center' });
    doc.end();
    doc.on('finish', () => resolve(filePath));
  });
}

module.exports = { generateCertificatePDF };
