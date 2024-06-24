import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseClientWithAuth = async (supabaseToken: string) => {
  const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
    }
  );

  return supabase;
};

export const supabaseClientPublic = createClient(supabaseUrl, supabaseAnonKey);
