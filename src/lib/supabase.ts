import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// eslint-disable-next-line
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
