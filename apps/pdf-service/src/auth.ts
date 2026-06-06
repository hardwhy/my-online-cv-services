import { createClient } from '@supabase/supabase-js';
import { config } from './config';

export function createPublicSupabaseClient() {
  return createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createAuthenticatedSupabaseClient(accessToken: string) {
  return createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

export async function requireAdminAccess(accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error('Admin export requires an Authorization bearer token.');
  }

  const client = createAuthenticatedSupabaseClient(accessToken);
  const { data, error } = await client.auth.getUser(accessToken);

  if (error || !data.user) {
    throw new Error('Invalid or expired admin session.');
  }

  return client;
}
