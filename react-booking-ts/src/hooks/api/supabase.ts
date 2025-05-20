import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://mxpqoufbrlvnquooiege.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
