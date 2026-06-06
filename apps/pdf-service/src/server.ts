import cors from 'cors';
import express from 'express';
import pino from 'pino';
import { cvTemplateRegistry } from '../../../packages/cv-renderer/src/index';
import { getPortfolioCVData } from '../../../packages/shared-services/src/index';
import { createPublicSupabaseClient, requireAdminAccess } from './auth';
import { allowedOrigins, config } from './config';
import { generateCvPdf } from './pdfGenerator';
import { cvPdfRequestSchema } from './requestSchema';

const logger = pino({ name: 'cv-pdf-service' });
const app = express();

app.use(express.json({ limit: '64kb' }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by PDF service CORS.`));
    },
  }),
);

app.get('/health', (_request, response) => {
  response.json({ ok: true, service: 'cv-pdf-service' });
});

app.get('/v1/cv/templates', (_request, response) => {
  response.json({ templates: cvTemplateRegistry });
});

app.post('/v1/cv/pdf', async (request, response) => {
  const parsed = cvPdfRequestSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: 'Invalid PDF export request.', issues: parsed.error.flatten() });
    return;
  }

  const options = parsed.data;
  const template = cvTemplateRegistry.find((item) => item.id === options.templateId);
  if (!template?.isAvailable) {
    response.status(400).json({ error: `Template ${options.templateId} is not available yet.` });
    return;
  }

  try {
    const bearerToken = request.header('authorization')?.replace(/^Bearer\s+/i, '');
    const supabase = options.visibility === 'admin' ? await requireAdminAccess(bearerToken) : createPublicSupabaseClient();
    const cvData = await getPortfolioCVData(supabase, { visibility: options.visibility });
    const pdf = await generateCvPdf(cvData, options);
    const fileName = `${cvData.profile.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'cv'}.pdf`;

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
    response.setHeader('Cache-Control', options.visibility === 'public' ? 'public, max-age=300' : 'no-store');
    response.send(pdf);
  } catch (error) {
    logger.error({ error }, 'Unable to generate CV PDF');
    response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to generate CV PDF.' });
  }
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

app.listen(config.PORT, () => {
  logger.info({ port: config.PORT }, 'CV PDF service is running');
});
