import OpenAI from 'openai';  // Make sure the OpenAI package is installed
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return "Sorry, I couldn't understand that.";
  }
};
