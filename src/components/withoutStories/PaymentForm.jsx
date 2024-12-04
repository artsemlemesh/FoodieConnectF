import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

const PaymentForm = ({ clientSecret, cartTotal }) => {
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

    if (!clientSecret) {
      alert('Payment intent secret is missing. Please try again.');
      return;
    }

    setLoading(true);
    setPaymentStatus('');

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.error('Submit error:', submitError);
        setPaymentStatus('Validation failed. Please check your details and try again.');
        setLoading(false);
        return;
      }
      console.log('Submitting payment with clientSecret:', clientSecret);

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: 'http://localhost:3001/success',
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        setPaymentStatus('Payment failed. Please try again.');
      } else {
        setPaymentStatus('Payment succeeded!');
      }
    } catch (err) {
      console.error('Error confirming card payment:', err);
      setPaymentStatus('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!stripe || loading}
        >
          {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
        </button>
        {/* Show any error or success messages */}
        {/* {message && <div id="payment-message">{message}</div>} */}
      </form>

     
      {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
    </div>
  );
};

export default PaymentForm;
