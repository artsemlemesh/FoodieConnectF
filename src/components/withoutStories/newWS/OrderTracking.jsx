import { useEffect, useState } from "react";
import { axiosClient } from "../../../utils/axiosClient";
import DeliveryMap from "./DeliveryMap";

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosClient.get(
          `http://localhost:8000/livedel/orders/${orderId}/`
        );

        console.log("Order response:", response.data);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  console.log("Order:", order);
  return (
    <div>
      <h2>Order #{orderId} Tracking</h2>
      <p>Status: {order.status}</p>
      <p>
        ETA:{" "}
        {order.eta
          ? new Date(order.eta).toLocaleTimeString()
          : "Calculating..."}
      </p>

      <DeliveryMap
        orderId={orderId}
        restaurantLocation={[
          order.restaurant.latitude,
          order.restaurant.longitude,
        ]}
        deliveryLocation={[order.latitude, order.longitude]}
        routeData={order.route_data}
        currentIndex={order.current_position_index}
      />
    </div>
  );
};

export default OrderTracking;