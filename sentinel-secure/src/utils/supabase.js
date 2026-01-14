import { createClient } from '@supabase/supabase-js';

// The URL must be the full endpoint found in your Supabase Dashboard (Settings -> API)
const supabaseUrl = 'https://pryonnfzuwjrsiqiqomj.supabase.co';

// Your public anon key
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeW9ubmZ6dXdqcnNpcWlxb21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzODM4MjEsImV4cCI6MjA4Mzk1OTgyMX0.dM2WOPpdnQUY7SCKyVFyYvFdhFaJjZbPAnzAk-uG8gA';

/**
 * Initializing the Supabase Client with Real-time enabled.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});