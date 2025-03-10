import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import useWebSocket from "../../../hooks/useWebSocket";

const webSocketUrlDeliveryLive = import.meta.env.VITE_APP_WEBSOCKET_LIVE_DELIVERY;

const DeliveryMap = ({ orderId, restaurantLocation, deliveryLocation, routeData, currentIndex }) => {
  const [deliveryPosition, setDeliveryPosition] = useState(
    routeData && routeData[currentIndex] ? routeData[currentIndex] : deliveryLocation
  );

  const wsUrl = `${webSocketUrlDeliveryLive}/${orderId}/`;
  // console.log("WebSocket URL:", wsUrl);



  // Use WebSocket to listen for position updates
  useWebSocket(wsUrl, (data) => {
    if (data.latitude && data.longitude) {
      // Update position based on WebSocket data
      setDeliveryPosition([data.latitude, data.longitude]);
     
    }
    (data) => data.status === 'DELIVERED' // Stop WebSocket connection when status is DELIVERED
  });

  // If routeData or deliveryLocation is not available, show loading
  if (!restaurantLocation || !deliveryLocation || !routeData) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={restaurantLocation}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Restaurant Marker */}
      <Marker position={restaurantLocation}>
        <Popup>Restaurant</Popup>
      </Marker>

      {/* Customer's delivery location */}
      <Marker
        position={deliveryLocation}
        icon={L.icon({ iconUrl: "/delivery.png", iconSize: [32, 32] })}
      >
        <Popup>Delivery Location</Popup>
      </Marker>

      {/* Moving delivery position */}
      {deliveryPosition && (
        <Marker
          position={deliveryPosition}
          icon={L.icon({ iconUrl: "/courier.png", iconSize: [32, 32] })}
        >
          <Popup>Delivery In Progress</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default DeliveryMap;