import React, { useState, useEffect } from 'react';
import Head from './Head';
import './MessageChat.css'; // 스타일을 별도의 CSS 파일로 분리

const MessageChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const response = await fetch('/get_messages');
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (messageContent.trim() === '') {
      return;
    }
    const newMessage = { user: 'me', content: messageContent };
    await fetch('/send_message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });
    setMessageContent('');
    loadMessages();
  };

  return (
    <div className="chat-container">
      <Head />
      <div className="message-list">
        {messages.map((message, index) => (
          <div className="message-item" key={index} style={{ textAlign: message.user === 'me' ? 'right' : 'left' }}>
            <span className="user-name">{message.user}</span>
            <span className="message-content">{message.content}</span>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} placeholder="message..." />
        <button type="button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageChat;
