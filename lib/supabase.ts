import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xremalxnqxfyqscjldde.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZW1hbHhucXhmeXFzY2psZGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NjAwOTQsImV4cCI6MjEwOTAzNjA5NH0.jcWnVdLGsBPJCHokqU5VuaFyXMViXL3kTzJgTHUdzrE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);