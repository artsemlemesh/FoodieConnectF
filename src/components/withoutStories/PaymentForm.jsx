import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert('Stripe has not loaded yet. Please try again.');
      return;
    }

    setLoading(true);
    setPaymentStatus('');

    try {
      const cardElement = elements.getElement(CardElement);

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        setPaymentStatus('Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      setPaymentStatus(`Payment succeeded! PaymentIntent ID: ${paymentIntent.id}`);
      setLoading(false);
    } catch (err) {
      console.error('Error confirming card payment:', err);
      setPaymentStatus('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!stripe || loading}
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
    </div>
  );
};

export default PaymentForm;