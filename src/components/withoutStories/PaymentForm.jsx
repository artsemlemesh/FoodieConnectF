import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useAppContext } from '../../context/GlobalContext';
import { axiosClient } from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ clientSecret, cartTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { state, setOrderId } = useAppContext();
  const navigate = useNavigate();
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
        setPaymentStatus(
          'Validation failed. Please check your details and try again.'
        );
        setLoading(false);
        return;
      }
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment failed:', error);
        setPaymentStatus('Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm payment on the backend
        const response = await axiosClient.post('/cart/payment/confirm/', {
          order_id: state.orderId, // Use the context orderId
        });

        // Update the context with the confirmed order ID
        setOrderId(response.data.order_id);

        // Redirect to the success page
        navigate('/success');
      } else {
        setPaymentStatus('Payment not completed. Please try again.');
      }
    } catch (err) {
      console.error('Error confirming payment:', err);
      setPaymentStatus('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!stripe || loading}
        >
          {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
        </button>
        {paymentStatus && <p className="mt-4 text-red-500">{paymentStatus}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
