
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handleCorsPreflightRequest = () => {
  return new Response(null, { headers: corsHeaders });
};

export const createErrorResponse = (error: string, status: number) => {
  return new Response(
    JSON.stringify({ error }),
    { 
      status, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    }
  );
};

export const createSuccessResponse = (response: string) => {
  return new Response(
    JSON.stringify({ response }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    }
  );
};
