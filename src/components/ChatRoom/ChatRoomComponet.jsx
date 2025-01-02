import React, { useState, useRef, useEffect } from 'react';
import useWebSocket from '../../hooks/useWebSocket';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]); // State for chat messages
  const [newMessage, setNewMessage] = useState(''); // Input field for new message
  const wsRef = useRef(null); // Reference for WebSocket instance
  const wsUrl = `ws://127.0.0.1:8000/ws/chat/${roomId}/`; // WebSocket URL for the room

  // Function to handle incoming WebSocket messages
  const handleWebSocketMessage = (data) => {
    console.log('Incoming WebSocket data:', data);

    if (data.type === 'chat_message') {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    }
  };

  // Initialize WebSocket and retain reference to `ws.current`
  useWebSocket(wsUrl, (data) => {
    console.log('Updating wsRef with WebSocket instance:', data.wsInstance);

    wsRef.current = data?.wsInstance || wsRef.current; // Capture WebSocket instance
    handleWebSocketMessage(data.data);
  });

  // Handle form submission to send a new message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        type: 'chat_message',
        message: newMessage,
      };
      console.log('beforeMessagemessageData', messageData)
      console.log('WebSocket instance:', wsRef.current)
      // if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(messageData)); // Send message to WebSocket
        console.log('MESSAGEDATA')
      // } else {
      //   console.error('WebSocket is not open.');
      // }

      setNewMessage(''); // Clear input
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Chat Room {roomId}</h2>

      {/* Chat Messages */}
      <div className="border p-2 h-64 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-700">{msg}</p>
          </div>
        ))}
      </div>

      {/* New Message Input */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;




// import React, { useState, useRef } from 'react';
// import useWebSocket from '../../hooks/useWebSocket';

// const ChatRoom = ({ roomId }) => {
//   const [messages, setMessages] = useState([]); // State for chat messages
//   const [newMessage, setNewMessage] = useState(''); // Input field for new message
//   const wsRef = useRef(null); // Reference for WebSocket instance
//   const wsUrl = `ws://127.0.0.1:8000/ws/chat/${roomId}/`; // WebSocket URL for the room

//   const handleWebSocketMessage = (data) => {
//     console.log('Incoming WebSocket data:', data);

//     if (data.type === 'chat_message') {
//       setMessages((prevMessages) => [...prevMessages, data.message]);
//     }
//   };

//   // Initialize WebSocket and retain the instance in wsRef
//   wsRef.current = useWebSocket(wsUrl, handleWebSocketMessage);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       const messageData = {
//         type: 'chat_message',
//         message: newMessage,
//       };

//       console.log('beforeMessagemessageData', messageData);
//       console.log('WebSocket instance:', wsRef.current);

//       if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//         wsRef.current.send(JSON.stringify(messageData)); // Send message to WebSocket
//         console.log('Message sent:', messageData);
//       } else {
//         console.error('WebSocket is not open.');
//       }

//       setNewMessage(''); // Clear input
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Chat Room {roomId}</h2>

//       {/* Chat Messages */}
//       <div className="border p-2 h-64 overflow-y-scroll">
//         {messages.map((msg, index) => (
//           <div key={index} className="mb-2">
//             <p className="text-sm text-gray-700">{msg}</p>
//           </div>
//         ))}
//       </div>

//       {/* New Message Input */}
//       <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border rounded px-2 py-1"
//           placeholder="Type your message..."
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatRoom;