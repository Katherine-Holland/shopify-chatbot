// pages/api/generate-chat-response.js
import { generateChatResponse } from "../../chatter-bot/app/utils/openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      const response = await generateChatResponse(message);
      res.status(200).json({ response: response });
    } catch (error) {
      console.error("Error generating chat response:", error);
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
