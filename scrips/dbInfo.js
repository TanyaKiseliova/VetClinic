import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.38.0/+esm'

const supabaseUrl = 'https://mxktgyhtzhhzfzsmwixc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14a3RneWh0emhoemZ6c213aXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0ODQyNzMsImV4cCI6MjA3OTA2MDI3M30.-N7M9hAM4iY6vZWLBtwctdAP0U56IPx-SUXdQnQao7k'

export const supabase = createClient(supabaseUrl, supabaseKey)