import React, { useEffect, useState } from 'react';
import useWebSocket from '../../hooks/useWebSocket';

const LiveOrderStatus = ({ orderId }) => {
  const [status, setStatus] = useState('Pending');
  console.log('STATUS', status)
  // Function to handle incoming WebSocket messages
  const handleWebSocketMessage = (data) => {
    console.log('1111')
    console.log('Received WebSocket message:', data);
    setStatus(data.message); // Update the status based on the message received
  };

  // Establish WebSocket connection
  useWebSocket(`ws://localhost:8000/ws/orders/${orderId}/`, handleWebSocketMessage)

  // // Optional: Send a message to the server (if needed)
  // const sendStatusRequest = () => {
  //   console.log('2222')
  //   sendMessage({ message: 'Requesting order status' })
  //   console.log('3333')

  // };

  // useEffect(() => {
  //   // Optionally send a message when the component mounts
  //   sendStatusRequest();
  // }, [orderId]);

  return (
    <div>
      <h2>Order #{orderId}</h2>
      <p>Status: {status}</p>
    </div>
  );
};

export default LiveOrderStatus;