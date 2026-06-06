import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { CVData, CVExportOptions } from '@web-cv-services/shared-types';
import { CVDocument } from './CVDocument';
import { cvPrintCss } from './styles';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function renderCVHtml(data: CVData, options: Partial<CVExportOptions> = {}) {
  const title = `${data.profile.fullName} - CV`;
  const description = data.profile.summary;
  const markup = renderToStaticMarkup(<CVDocument data={data} options={{ templateId: 'modern-ats', visibility: 'public', paperSize: 'A4', theme: 'light', locale: 'en', ...options }} />);

  return `<!doctype html>
<html lang="${escapeHtml(options.locale ?? 'en')}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="${escapeHtml(data.profile.fullName)}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    <style>${cvPrintCss}</style>
  </head>
  <body>${markup}</body>
</html>`;
}
