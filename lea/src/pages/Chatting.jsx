import React, { useState } from "react";
import Navbar from "../components/Homepage/Navbar.jsx";
import ReactMarkdown from "react-markdown"; // Import the react-markdown component
import "./chatting.css";

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user's message to the chat
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    fetch("http://localhost:8000/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputValue }), // Changed 'query' to 'message'
    })
      .then((res) => res.json())
      .then((data) => {
        const botResponse = {
          text: data.response, // Changed 'data.answer' to 'data.response'
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Clear input box after sending
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="chat-container">
        <Navbar />
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              {message.sender === "bot" ? (
                <ReactMarkdown>{message.text}</ReactMarkdown> // Render bot messages as Markdown
              ) : (
                message.text // Render user messages as plain text
              )}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chatting;
