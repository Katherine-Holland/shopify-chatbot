import React, { useState, useEffect } from 'react'; //not working

// Example brand colors (you can customize these according to your client's preferences)
const brandColors = {
  primaryColor: "#FF5733", // Red color for the heading
  backgroundColor: "#f9f9f9", // Light background color for the chatbot
};

// Function to simulate checking if a user is logged in (replace with actual logic)
const getUserFromShopify = async () => {
  // For now, simulate no user being logged in (you will replace this with actual logic later)
  return null; // No user logged in (for now)
};

// Chatbot component
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // Store the logged-in user details
  const [inputValue, setInputValue] = useState(""); // State for input field value
  const [isLoading, setIsLoading] = useState(false); // State for loading indication

  // Fetch user login status when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getUserFromShopify(); // This function checks login status
      setUser(loggedInUser);
    };
    fetchUser();
  }, []);

  // Function to handle sending a message
  const handleSendMessage = async (messageText) => {
    if (messageText.trim() === "") return; // Prevent sending empty messages

    // Add the user's message to the message list
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: messageText },
    ]);

    // Show loading state while waiting for a response
    setIsLoading(true);

    try {
      // Send the message to the backend API and get the response
      const response = await fetch('/api/generate-chat-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      // Add the chatbot's response to the message list
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatbot', text: data.response?.choices?.[0]?.message?.content || "No response" },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatbot', text: "Sorry, I'm having trouble responding right now." },
      ]);
    } finally {
      setIsLoading(false); // Hide loading state after the response
    }
  };

  return (
    <div style={{ backgroundColor: brandColors.backgroundColor, padding: '20px', borderRadius: '10px', width: '300px', position: 'fixed', bottom: '10px', right: '10px' }}>
      <h3 style={{ color: brandColors.primaryColor }}>Chatbot</h3>
      <div style={{ overflowY: 'scroll', height: '200px', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            <strong>{message.sender === 'user' ? 'You' : 'Chatbot'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        {/* Display different greeting based on user login status */}
        <p>
          {user 
            ? `Welcome back, ${user.name}! How can I assist you today?`
            : 'Welcome to our store! How can I help you today?'}
        </p>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update input value on change
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(inputValue); // Send message on Enter
              setInputValue(""); // Clear input field after sending message
            }
          }}
          style={{ width: '100%', padding: '10px' }}
        />
        {isLoading && <p>Loading...</p>} {/* Display loading message when waiting for response */}
      </div>
    </div>
  );
};

export default Chatbot;
