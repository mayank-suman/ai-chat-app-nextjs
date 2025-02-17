'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Create a new instance of the GoogleGenerativeAI class
function createClient() {
  if (!process.env.NEXT_GEMINI_API_KEY) {
    throw new Error('NEXT_GEMINI_API_KEY is not defined');
  }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  return model;
}

export const generateContent = async (prompt: string) => {
  try {
    const model = createClient();
    const res = await model.generateContent(prompt);

    return res?.response?.text();
  } catch (error) {
    console.error(error);
  }
};

export const getConversationTitle = async (prompt: string) => {
  const input = `Given a user prompt, generate a concise and informative title that accurately describes the conversation.
  Consider keywords, topics, and the overall intent of the prompt. 
  Response in plain text format, not markdown. Prompt: ${prompt}'`;

  return (await generateContent(input)) ?? 'Untitled Conversation';
};

export const getAIResponse = async (prompt: string, chatHistory: []) => {
  try {
    const model = createClient();
    const newChart = model.startChat({
      history: chatHistory,
    });

    const res = await newChart.sendMessage(prompt);

    return res?.response?.text();
  } catch (error) {
    console.error(error);
  }
};
