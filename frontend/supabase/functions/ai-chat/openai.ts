
import { createErrorResponse } from './cors.ts';
import { getSystemPrompt } from './systemPrompt.ts';

export interface ChatMessage {
  role: string;
  content: string;
}

export const callOpenAI = async (
  message: string, 
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<string | Response> => {
  // Get and validate OpenAI API key
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API key not configured");
    return createErrorResponse("AI service not configured. Please contact support.", 500);
  }

  // Prepare conversation messages with enhanced system prompt
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: getSystemPrompt()
    }
  ];

  // Add conversation history if provided
  if (conversationHistory && Array.isArray(conversationHistory)) {
    // Limit history to last 10 messages to prevent token limit issues
    const recentHistory = conversationHistory.slice(-10);
    messages.push(...recentHistory);
  }

  // Add current user message
  messages.push({
    role: "user",
    content: message
  });

  console.log("Sending request to OpenAI with", messages.length, "messages");

  try {
    // Call OpenAI Chat Completions API
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    // Check if OpenAI request was successful
    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      console.error("OpenAI API error:", openAiResponse.status, errorText);
      
      let errorMessage = "AI service temporarily unavailable. Please try again.";
      
      if (openAiResponse.status === 401) {
        errorMessage = "AI service authentication failed. Please contact support.";
      } else if (openAiResponse.status === 429) {
        errorMessage = "AI service is busy. Please wait a moment and try again.";
      } else if (openAiResponse.status >= 500) {
        errorMessage = "AI service is experiencing issues. Please try again later.";
      }

      return createErrorResponse(errorMessage, 503);
    }

    // Parse OpenAI response
    let openAiData;
    try {
      openAiData = await openAiResponse.json();
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return createErrorResponse("Invalid response from AI service", 502);
    }

    // Validate OpenAI response structure
    if (!openAiData || !openAiData.choices || !Array.isArray(openAiData.choices) || openAiData.choices.length === 0) {
      console.error("Invalid OpenAI response structure:", openAiData);
      return createErrorResponse("Invalid response from AI service", 502);
    }

    const choice = openAiData.choices[0];
    if (!choice || !choice.message || !choice.message.content) {
      console.error("Invalid choice structure in OpenAI response:", choice);
      return createErrorResponse("Invalid response from AI service", 502);
    }

    const aiResponse = choice.message.content.trim();

    // Validate response content
    if (!aiResponse) {
      console.error("Empty response from OpenAI");
      return createErrorResponse("AI service returned empty response", 502);
    }

    console.log("Successfully generated AI response");
    return aiResponse;

  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return createErrorResponse("AI service temporarily unavailable. Please try again.", 503);
  }
};
