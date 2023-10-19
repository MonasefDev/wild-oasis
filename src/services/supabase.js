import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jfavegaygfjaelnadjzj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmYXZlZ2F5Z2ZqYWVsbmFkanpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1NTg4OTYsImV4cCI6MjAxMzEzNDg5Nn0.883GimJIHBMgk5nym78vo3yT2q2pqxnEsg3WZ5WbUmY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
