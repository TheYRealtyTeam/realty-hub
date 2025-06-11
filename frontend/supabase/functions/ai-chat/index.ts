
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders, handleCorsPreflightRequest, createErrorResponse, createSuccessResponse } from './cors.ts';
import { validateRequest } from './validation.ts';
import { callOpenAI } from './openai.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  try {
    // Validate request and parse data
    const validationResult = await validateRequest(req);
    
    // If validation failed, return the error response
    if (validationResult instanceof Response) {
      return validationResult;
    }

    const { message, conversationHistory } = validationResult;

    // Call OpenAI API
    const openAiResult = await callOpenAI(message, conversationHistory);
    
    // If OpenAI call failed, return the error response
    if (openAiResult instanceof Response) {
      return openAiResult;
    }

    // Return successful response
    return createSuccessResponse(openAiResult);

  } catch (error) {
    console.error("Unexpected error in AI chat function:", error);
    
    // Return generic error response
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred. Please try again.",
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
