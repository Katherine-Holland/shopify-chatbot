import OpenAI from "openai";
import dotenv from "dotenv";

// Load the environment variables from the .env file
dotenv.config();

// Set up OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Function to generate a response from OpenAI
export const generateChatResponse = async (message) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",  // or "gpt-4" if you want the latest model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I couldn't understand that.";
  }
};

export default openai;
