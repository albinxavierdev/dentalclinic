import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ukywqczdqlguxaacrhcr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXdxY3pkcWxndXhhYWNyaGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDUyNDYsImV4cCI6MjA3OTkyMTI0Nn0.Wbf80pfDp01sqmBycX3Y7wfCRk8ief1jgGDavaMZrvw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
