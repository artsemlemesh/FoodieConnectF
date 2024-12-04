import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import PaymentForm from '../components/withoutStories/PaymentForm';
import { axiosClient } from './axiosClient';

const stripePromise = loadStripe(
  'pk_test_51PLGUYIhhfcmQPRULxV6eXxZHMWqEEW29vQ1FdVwcjE7CevUdT4TnnWVHu15xXC7ZQ7x8CXtXtUbqj3I2zZFlqEn00fS1PbLT0'
);

const PaymentWrapper = () => {
  const cart = useSelector((state) => state.cart.items);
  const cartTotal = cart.reduce((total, item) => total + item.total_price, 0); // Calculate total cart price

  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axiosClient.post('/cart/create-payment-intent/', {
          amount: cartTotal * 100, // Convert to cents
        });

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching clientSecret:', error);
      }
    };

    if (cartTotal > 0) {
      fetchClientSecret();
    }
  }, [cartTotal]);

  if (!clientSecret) {
    return <p>Loading payment details...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} cartTotal={cartTotal}/>
    </Elements>
  );
};

export default PaymentWrapper;