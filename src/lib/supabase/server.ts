import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Server-side Supabase client for public reads (respects RLS).
 * Uses the `website` schema exclusively.
 */
export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: 'website' },
  });
}
