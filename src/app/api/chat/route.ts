import { google } from '@ai-sdk/google';
import { streamText, convertToCoreMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const result = await streamText({
      model: google('gemini-1.5-flash-latest'),
      messages: convertToCoreMessages(messages),
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('An error occurred', { status: 500 });
  }
}