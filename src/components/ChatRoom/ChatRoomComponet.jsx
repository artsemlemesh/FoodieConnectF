import React, { useState } from "react";
import FetchMessages from "./FetchMessages";
// import SubscribeMessages from "./SubscribeMessages";
import SendMessage from "./SendMessage";

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="chat-room bg-gray-100 p-4 rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat Room</h2>
      <FetchMessages roomId={roomId} />
      {/* <SubscribeMessages roomId={roomId} onNewMessage={handleNewMessage} /> */}
      <SendMessage roomId={roomId} />
    </div>
  );
};

export default ChatRoom;