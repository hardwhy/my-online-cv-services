import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.coerce.number().int().positive().default(4100),
  PDF_ALLOWED_ORIGINS: z.string().default('http://localhost:9000,http://localhost:9001'),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
});

export const config = envSchema.parse(process.env);

export const allowedOrigins = config.PDF_ALLOWED_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
