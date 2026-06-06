export const cvPrintCss = `
@page {
  size: A4;
  margin: 16mm 15mm;
}

* {
  box-sizing: border-box;
}

html {
  color: #0f172a;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-size: 10.5pt;
  line-height: 1.45;
}

body {
  margin: 0;
  background: #ffffff;
}

a {
  color: #0e7490;
  text-decoration: none;
}

h1,
h2,
h3,
p {
  margin: 0;
}

ul {
  margin: 0;
  padding-left: 1.1rem;
}

li {
  margin-top: 0.18rem;
}

.cv-document {
  background: #ffffff;
  color: #0f172a;
  font-family: Inter, Arial, Helvetica, sans-serif;
  line-height: 1.45;
  margin: 0 auto;
  max-width: 210mm;
  padding: 0;
}

.cv-header {
  border-bottom: 1px solid #cbd5e1;
  display: grid;
  gap: 0.35rem;
  padding-bottom: 0.7rem;
}

.cv-name {
  color: #0f172a;
  font-size: 25pt;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.cv-title {
  color: #0e7490;
  font-size: 12pt;
  font-weight: 700;
}

.cv-contact {
  color: #475569;
  display: flex;
  flex-wrap: wrap;
  font-size: 9pt;
  gap: 0.25rem 0.6rem;
}

.cv-main {
  padding-top: 0.85rem;
}

.cv-section {
  margin-top: 0.82rem;
}

.cv-section:first-child {
  margin-top: 0;
}

.cv-section-title {
  border-bottom: 1px solid #e2e8f0;
  break-after: avoid;
  color: #0f172a;
  font-size: 10pt;
  font-weight: 800;
  letter-spacing: 0.12em;
  margin-bottom: 0.42rem;
  padding-bottom: 0.16rem;
  page-break-after: avoid;
  text-transform: uppercase;
}

.cv-entry {
  break-inside: avoid;
  display: grid;
  gap: 0.2rem;
  margin-top: 0.48rem;
  page-break-inside: avoid;
}

.cv-entry:first-of-type {
  margin-top: 0;
}

.cv-entry-heading {
  align-items: baseline;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.cv-entry-title {
  color: #0f172a;
  font-size: 10.5pt;
  font-weight: 800;
}

.cv-entry-meta {
  color: #64748b;
  font-size: 8.5pt;
  font-weight: 700;
  white-space: nowrap;
}

.cv-entry-subtitle {
  color: #334155;
  font-size: 9pt;
  font-weight: 700;
}

.cv-summary,
.cv-entry-body {
  color: #334155;
}

.cv-tags,
.cv-skill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.cv-tag {
  background: #ecfeff;
  border: 1px solid #a5f3fc;
  border-radius: 999px;
  color: #155e75;
  font-size: 8pt;
  font-weight: 700;
  padding: 0.08rem 0.34rem;
}

.cv-skill-group {
  break-inside: avoid;
  margin-top: 0.32rem;
}

.cv-skill-category {
  color: #0f172a;
  font-size: 9pt;
  font-weight: 800;
  margin-bottom: 0.15rem;
}

.cv-two-column {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: 1fr 1fr;
}

@media print {
  .cv-document {
    max-width: none;
  }
}
`;

export const cvPreviewCss = `
.cv-document,
.cv-document * {
  box-sizing: border-box;
}

.cv-document a {
  color: #0e7490;
  text-decoration: none;
}

.cv-document h1,
.cv-document h2,
.cv-document h3,
.cv-document p {
  margin: 0;
}

.cv-document ul {
  margin: 0;
  padding-left: 1.1rem;
}

.cv-document li {
  margin-top: 0.18rem;
}

.cv-document {
  background: #ffffff;
  color: #0f172a;
  font-family: Inter, Arial, Helvetica, sans-serif;
  line-height: 1.45;
  margin: 0 auto;
  max-width: 210mm;
  padding: 0;
}

.cv-header {
  border-bottom: 1px solid #cbd5e1;
  display: grid;
  gap: 0.35rem;
  padding-bottom: 0.7rem;
}

.cv-name {
  color: #0f172a;
  font-size: 25pt;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.cv-title {
  color: #0e7490;
  font-size: 12pt;
  font-weight: 700;
}

.cv-contact {
  color: #475569;
  display: flex;
  flex-wrap: wrap;
  font-size: 9pt;
  gap: 0.25rem 0.6rem;
}

.cv-main {
  padding-top: 0.85rem;
}

.cv-section {
  margin-top: 0.82rem;
}

.cv-section:first-child {
  margin-top: 0;
}

.cv-section-title {
  border-bottom: 1px solid #e2e8f0;
  break-after: avoid;
  color: #0f172a;
  font-size: 10pt;
  font-weight: 800;
  letter-spacing: 0.12em;
  margin-bottom: 0.42rem;
  padding-bottom: 0.16rem;
  page-break-after: avoid;
  text-transform: uppercase;
}

.cv-entry {
  break-inside: avoid;
  display: grid;
  gap: 0.2rem;
  margin-top: 0.48rem;
  page-break-inside: avoid;
}

.cv-entry:first-of-type {
  margin-top: 0;
}

.cv-entry-heading {
  align-items: baseline;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.cv-entry-title {
  color: #0f172a;
  font-size: 10.5pt;
  font-weight: 800;
}

.cv-entry-meta {
  color: #64748b;
  font-size: 8.5pt;
  font-weight: 700;
  white-space: nowrap;
}

.cv-entry-subtitle {
  color: #334155;
  font-size: 9pt;
  font-weight: 700;
}

.cv-summary,
.cv-entry-body {
  color: #334155;
}

.cv-tags,
.cv-skill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.cv-tag {
  background: #ecfeff;
  border: 1px solid #a5f3fc;
  border-radius: 999px;
  color: #155e75;
  font-size: 8pt;
  font-weight: 700;
  padding: 0.08rem 0.34rem;
}

.cv-skill-group {
  break-inside: avoid;
  margin-top: 0.32rem;
}

.cv-skill-category {
  color: #0f172a;
  font-size: 9pt;
  font-weight: 800;
  margin-bottom: 0.15rem;
}

.cv-two-column {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: 1fr 1fr;
}
`;
