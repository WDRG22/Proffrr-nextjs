import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

// Submit requests using OPENAI_ASSISTANT_KEY to use our custom chatgpt assistant
// At end of chat request signup or login. Need user_id before submitting request
// Use function calling once sufficient information received to make call to 
// /v1/customer/request route to create a request
// All this should occur within the same chat

export const maxDuration = 15;
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: 'You are a helpful assistant',
      messages: convertToCoreMessages(messages)
    });

    return result.toDataStreamResponse();

  } catch (error) {    
    console.error('Error in chat API:', error);
    return new Response('An error occurred', { status: 500 });
  }
}