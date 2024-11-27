import React from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post('/cart/checkout/');
      alert(response.data.message);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;