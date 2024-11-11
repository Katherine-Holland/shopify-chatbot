import { json } from '@remix-run/node';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const action = async ({ request }) => {
  try {
    const { message } = await request.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
    });

    const content = response.choices[0]?.message?.content || "No response available";

    return json({ response: content });
  } catch (error) {
    console.error('Error generating response:', error);
    return json({ response: "Sorry, I couldn't respond right now." }, { status: 500 });
  }
};
