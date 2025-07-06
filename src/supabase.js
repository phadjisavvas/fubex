// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jashplgrqeeewlrchnjjh.supabase.io';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphc2hwbGdycWVld2xyY2huamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTA3NjcsImV4cCI6MjA2NzM4Njc2N30.hWoBtWNaauOObiQHiMxg5Nqq8AA87KDmdZ4cV66ppnM'; // Get this from Supabase -> Project -> API page

export const supabase = createClient(supabaseUrl, supabaseKey);
