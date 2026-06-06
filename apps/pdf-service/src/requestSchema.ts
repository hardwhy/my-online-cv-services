import { z } from 'zod';

export const cvPdfRequestSchema = z.object({
  templateId: z.enum(['modern-ats', 'executive-professional', 'minimal-clean', 'creative-portfolio']).default('modern-ats'),
  visibility: z.enum(['public', 'admin']).default('public'),
  paperSize: z.enum(['A4', 'Letter']).default('A4'),
  theme: z.enum(['light', 'dark']).default('light'),
  locale: z.string().min(2).default('en'),
  refresh: z.boolean().optional(),
});

export type CvPdfRequest = z.infer<typeof cvPdfRequestSchema>;
