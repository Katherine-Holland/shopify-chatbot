import React, { useState, useEffect } from 'react';

// Define the types for message objects
type Message = {
  sender: 'user' | 'chatbot'; // Sender can either be 'user' or 'chatbot'
  text: string; // Text is a string
};

const brandColors = {
  primaryColor: "#FF5733",
  backgroundColor: "#f9f9f9",
};

const Chatbot = () => {
  // Explicitly type 'messages' as an array of Message objects
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>(""); // inputValue is a string
  const [isLoading, setIsLoading] = useState<boolean>(false); // isLoading is a boolean

  const handleSendMessage = async (messageText: string) => {
    if (messageText.trim() === "") return; // If message is empty, do nothing

    // Add user message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: messageText },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-chat-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      // Add chatbot response to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatbot', text: data.response?.choices?.[0]?.message?.content || "No response" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatbot', text: "Sorry, I couldn't respond right now." },
      ]);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div
      style={{
        backgroundColor: brandColors.backgroundColor,
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        position: 'fixed',
        bottom: '10px',
        right: '10px',
      }}
    >
      <h3 style={{ color: brandColors.primaryColor }}>Chatbot</h3>
      <div style={{ overflowY: 'scroll', height: '200px', marginBottom: '10px' }}>
        {/* Render messages */}
        {messages.map((message, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            <strong>{message.sender === 'user' ? 'You' : 'Chatbot'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(inputValue); // Send message on Enter key press
              setInputValue(""); // Clear input field
            }
          }}
          style={{ width: '100%', padding: '10px' }}
        />
        {isLoading && <p>Loading...</p>} {/* Display loading indicator */}
      </div>
    </div>
  );
};

export default Chatbot;
