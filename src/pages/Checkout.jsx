import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import useAuthAndFetchCart from '../hooks/useAuthAndFetchCart';

const CheckoutPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);

  useAuthAndFetchCart()

 

  const handleCheckout = async () => {
    try {
        const response = await dispatch(addToCart()).unwrap()
        console.log('Order successful:', response);
        alert('Order placed successfully!');
        navigate('/'); // Redirect to home or order confirmation page

    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');

    }
  };
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <img
                src={item.product.photo}
                alt={item.product.name}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <div className="text-gray-600">
                  ${item.product.price} x {item.quantity}
                </div>
              </div>
              <div className="text-lg font-bold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="mt-4 text-right text-xl font-bold">
            Total: ${cartTotal.toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;