import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderStatus } from '../../features/orderSlice';

const OrderStatus = ({ orderId }) => {
  const dispatch = useDispatch();
  const orderStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    dispatch(fetchOrderStatus(orderId));
  }, [dispatch, orderId]);

  return (
    <div className="order-status">
      <h3>Order Status: {orderStatus}</h3>
    </div>
  );
};

export default OrderStatus;