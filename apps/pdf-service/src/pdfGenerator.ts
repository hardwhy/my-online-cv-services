import { PDFDocument } from 'pdf-lib';
import { chromium } from 'playwright';
import { renderCVHtml } from '../../../packages/cv-renderer/src/index';
import type { CVData } from '@web-cv-services/shared-types';
import type { CvPdfRequest } from './requestSchema';

export async function generateCvPdf(data: CVData, options: CvPdfRequest) {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage({
      viewport: {
        width: options.paperSize === 'Letter' ? 816 : 794,
        height: options.paperSize === 'Letter' ? 1056 : 1123,
      },
    });
    const html = renderCVHtml(data, options);

    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.evaluate(() => document.fonts?.ready);

    const pdfBuffer = await page.pdf({
      format: options.paperSize,
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate:
        '<div style="width:100%;font-family:Inter,Arial,sans-serif;font-size:8px;color:#64748b;text-align:center;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: {
        top: '16mm',
        right: '15mm',
        bottom: '16mm',
        left: '15mm',
      },
    });

    return applyPdfMetadata(Buffer.from(pdfBuffer), data);
  } finally {
    await browser.close();
  }
}

async function applyPdfMetadata(pdfBuffer: Buffer, data: CVData) {
  const document = await PDFDocument.load(pdfBuffer);
  document.setTitle(`${data.profile.fullName} - CV`);
  document.setAuthor(data.profile.fullName);
  document.setSubject('Professional CV');
  document.setKeywords(['CV', 'Resume', 'Software Engineer', 'ATS', data.profile.fullName]);
  document.setProducer('Portfolio PDF Export Service');
  document.setCreator('Portfolio PDF Export Service');
  document.setCreationDate(new Date());
  document.setModificationDate(new Date());

  const bytes = await document.save();
  return Buffer.from(bytes);
}
