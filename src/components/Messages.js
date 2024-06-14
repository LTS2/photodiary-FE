import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8081/api/messages/received', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (messageId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8081/api/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(messages.filter(message => message.id !== messageId));
    } catch (err) {
      alert('Error deleting message');
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      <div className="messages-container">
        <h1>Messages</h1>
        <ul className="message-list">
          {messages.map(message => (
              <li className="message-item" key={message.id}>
                <span className="message-user">{message.sender.username}</span>
                <span className="message-content">{message.content}</span>
                <span className="message-status">
              {message.isRead ? <span className="read-dot"></span> : <span className="unread-dot"></span>}
            </span>
                <button className="delete-button" onClick={() => handleDelete(message.id)}>🗑️</button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Messages;
