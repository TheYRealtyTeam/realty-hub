
import { createErrorResponse } from './cors.ts';

export interface RequestData {
  message: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

export const validateRequest = async (req: Request): Promise<RequestData | Response> => {
  // Validate request method
  if (req.method !== 'POST') {
    return createErrorResponse("Method not allowed", 405);
  }

  // Validate content type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return createErrorResponse("Invalid content type. Expected application/json", 400);
  }

  // Parse and validate request body
  let requestData: RequestData;
  try {
    requestData = await req.json();
  } catch (parseError) {
    console.error("JSON parsing error:", parseError);
    return createErrorResponse("Invalid JSON in request body", 400);
  }

  const { message, conversationHistory } = requestData;

  // Validate message
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return createErrorResponse("Message is required and must be a non-empty string", 400);
  }

  // Validate message length (prevent abuse)
  if (message.length > 4000) {
    return createErrorResponse("Message too long. Maximum 4000 characters allowed", 400);
  }

  return { message: message.trim(), conversationHistory };
};
