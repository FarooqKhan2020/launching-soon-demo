import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Admin signups request received');

    // Get password from Authorization header
    const authHeader = req.headers.get('Authorization');
    const password = authHeader?.replace('Bearer ', '');

    // Check admin password (stored in environment variable)
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured');
      return new Response(
        JSON.stringify({ error: 'Admin access not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!password || password !== adminPassword) {
      console.log('Unauthorized admin access attempt');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all signups, sorted by created_at (latest first)
    const { data: signups, error } = await supabase
      .from('signups')
      .select('email, created_at, ip_address')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database query error:', error);
      throw error;
    }

    console.log(`Retrieved ${signups?.length || 0} signups for admin`);

    return new Response(
      JSON.stringify({ 
        signups: signups || [],
        total: signups?.length || 0
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Admin signups function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to retrieve signups',
        signups: []
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
