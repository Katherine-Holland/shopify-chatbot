import React from 'react';

export default function TestChatbot() {
  const testChat = async () => {
    const userMessage = "Hello, how are you today?"; // The test message

    try {
      // Make a POST request to the API route
      const response = await fetch("/api/generate-chat-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const chatResponseText = data?.response?.choices?.[0]?.message?.content || "No response";
      console.log("Response from OpenAI:", chatResponseText);
      alert(chatResponseText); // Optionally show the response in an alert
    } catch (error) {
      console.error("Error fetching chat response:", error);
      alert("There was an error with the chatbot. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Test Chatbot</h1>
      <button onClick={testChat}>Test Chatbot</button>
    </div>
  );
}
