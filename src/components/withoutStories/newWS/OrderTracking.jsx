import { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../../../utils/axiosClient';
import DeliveryMap from './DeliveryMap';

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const intervalRef = useRef(null); // To store the interval ID

  const fetchOrder = async () => {
    try {
      const response = await axiosClient.get(
        `http://localhost:8000/livedel/orders/${orderId}/`
      );

      // console.log('get response:', response.data);
      setOrder(response.data);

      // 🛑 Stop polling if delivered
      if (response.data.status === 'DELIVERED' && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log('Order delivered! Stopping polling.');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const startDelivery = async () => {
    try {
      const response = await axiosClient.post(
        `http://localhost:8000/livedel/orders/${orderId}/start-delivery/`
      );

      // console.log('post response:', response.data);
      // setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const resetOrder = async () => {
    try {
      const response = await axiosClient.post(
        `http://localhost:8000/livedel/orders/${orderId}/reset/`
      );

      console.log('reset response:', response.data);
      fetchOrder();
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    console.log('START DELIVERY');
    // startDelivery();
    fetchOrder();

    intervalRef.current = setInterval(fetchOrder, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [orderId]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  console.log('Order:', order);
  return (
    <div>
      <h2>Order #{orderId} Tracking</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={resetOrder}
      >
        Refresh
      </button>
      <button onClick={startDelivery} >Start Delivery</button>
      <p>Status: {order.status}</p>
      <p>
        ETA:{' '}
        {order.status === 'DELIVERED'
          ? 'Delivered'
          : order.eta
          ? new Date(order.eta).toLocaleTimeString()
          : 'Calculating...'}
      </p>
        {/* {order.eta
          ? new Date(order.eta).toLocaleTimeString()
          : 'Calculating...'}
      </p> */}

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
