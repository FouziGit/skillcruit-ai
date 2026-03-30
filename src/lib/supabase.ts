import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ciunsemhuxzpepmlgbyq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdW5zZW1odXh6cGVwbWxnYnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODk3MzQsImV4cCI6MjA4OTM2NTczNH0.1Sj1ST3S-cmTd3RjKzRja1_jFR3mJKe4987ZNgeUm3k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
