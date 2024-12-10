import React, { useState } from 'react';
import useWebSocket from '../../hooks/useWebSocket';

const webSocketUrl = import.meta.env.VITE_APP_WEBSOCKET_URL;

const LiveOrderStatus = ({ orderId }) => {
  const [orderData, setOrderData] = useState({ status: 'Pending', eta: null });
  console.log('orderData', orderData);

  const handleWebSocketMessage = (data) => {
    if (data.message === 'Delivered') {
      setOrderData({ status: data.message, eta: null });
    } else {
      setOrderData({
        status: data.message || 'Unknown',
        eta: data.eta || null,
      });
    }
  };
  // Establish WebSocket connection
  useWebSocket(`${webSocketUrl}/${orderId}/`, handleWebSocketMessage);

  const formattedETA = orderData.eta
    ? new Date(orderData.eta).toLocaleTimeString()
    : 'Calculating...';

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Order Status: {orderData.status}</h2>
      {orderData.eta && <p>ETA: {formattedETA} minutes</p>}
    </div>
  );
};

export default LiveOrderStatus;
