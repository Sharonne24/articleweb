import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

export const supabaseUrl = 'https://yuiemhobzygguslqmheq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aWVtaG9ienlnZ3VzbHFtaGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDM4NjYsImV4cCI6MjAyNjAxOTg2Nn0.m7lLI84wQBuLwnxZ752FzGPHgukeX8Xk0a6tW9xTLAc';

// eslint-disable-next-line
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
