import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import PaymentForm from '../components/withoutStories/PaymentForm';
import { axiosClient } from './axiosClient';
import LiveOrderStatus from '../components/withoutStories/LiveOrderStatus';
import { useAppContext } from '../context/GlobalContext';

const stripePromise = loadStripe(
  'pk_test_51PLGUYIhhfcmQPRULxV6eXxZHMWqEEW29vQ1FdVwcjE7CevUdT4TnnWVHu15xXC7ZQ7x8CXtXtUbqj3I2zZFlqEn00fS1PbLT0'
);

const PaymentWrapper = () => {
  const cart = useSelector((state) => state.cart.items);
  const cartTotal = cart.reduce((total, item) => total + item.total_price, 0);

  const { state } = useAppContext();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state.orderId) {
      console.error('Order ID is missing from context');
      return;
    }

    const fetchClientSecret = async () => {
      if (cartTotal > 0 && !clientSecret && !loading) {
        setLoading(true);
      }
      try {
        const response = await axiosClient.post(
          '/cart/create-payment-intent/',
          {
            amount: cartTotal * 100, // Convert to cents
            order_id: state.orderId, // Use the existing order ID to prevent duplicates ///added state
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching clientSecret:', error);
        setLoading(false);
      }
    };

    if (cartTotal > 0 && !clientSecret) {
      //prevents multiple calls/requests
      fetchClientSecret();
    }
  }, [cartTotal, clientSecret, state.orderId]); // Only call if `clientSecret` is null

  if (!clientSecret) {
    return <p>Loading payment details...</p>;
  }
  return (
    <>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} cartTotal={cartTotal} />
      </Elements>
      {state.orderId && <LiveOrderStatus orderId={state.orderId} />}
    </>
  );
};

export default PaymentWrapper;
