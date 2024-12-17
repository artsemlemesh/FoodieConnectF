import React, { useState } from 'react';
import useWebSocket from '../../hooks/useWebSocket';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const webSocketUrl = import.meta.env.VITE_APP_WEBSOCKET_URL;
console.log('webSOKEG', webSocketUrl)

const LiveOrderStatus = ({ orderId }) => {
  const [orderData, setOrderData] = useState({
    status: 'Pending',
    eta: null,
    position: { lat: 40.712776, lng: -74.005974 }, // Default position
  });
  console.log('orderData', orderData);
  const handleWebSocketMessage = (data) => {
    if (data.status) {
      const etaMinutes = data.eta
        ? Math.max(0, Math.ceil((new Date(data.eta) - new Date()) / 60000))
        : null;

      // Update state only if there's a change to prevent unnecessary renders
      setOrderData((prev) => ({
        status: data.status || prev.status,
        eta: data.status === 'Delivered' ? null : etaMinutes,
        position: data.position || prev.position,
      }));
    }
  };
  // Establish WebSocket connection
  useWebSocket(`${webSocketUrl}/${orderId}/`, handleWebSocketMessage);

  const formattedETA = orderData.eta
    ? `${orderData.eta} mins`
    : 'Calculating...';

  // Custom Leaflet icon for delivery vehicle
  const deliveryIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Use a delivery pin icon
    iconSize: [30, 30],
  });

  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Order Tracker</h2>
      <div className="w-full h-72 md:h-96 mb-4 rounded-lg overflow-hidden">
        <MapContainer
          center={orderData.position}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={orderData.position} icon={deliveryIcon}>
            <Popup>
              <strong>Delivery Vehicle</strong>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">
          Status: <span className="text-blue-500">{orderData.status}</span>
        </p>
        {orderData.eta && (
          <p className="text-lg text-gray-700 mt-2">
            ETA: <span className="font-medium">{formattedETA}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveOrderStatus;
