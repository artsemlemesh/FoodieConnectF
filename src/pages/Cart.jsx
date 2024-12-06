import { useDispatch, useSelector } from 'react-redux';
import { checkoutCart, removeFromCart, updateCartItem } from '../features/cartSlice';
import useAuthAndFetchCart from '../hooks/useAuthAndFetchCart';
import { useNavigate } from 'react-router-dom';
import OrderStatus from '../components/withoutStories/OrderStatus';
import LiveOrderStatus from '../components/withoutStories/LiveOrderStatus';

const CartPage = () => {
  useAuthAndFetchCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items); // Get cart items from Redux store

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
    } else {
      handleRemove(productId); // Remove item if quantity is 0
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const cartTotal = cart.reduce((total, item) => total + item.total_price, 0);
  
  
  
  const handleCheckout = async () => {
    try {
      console.log('before checkout')
      const response = await dispatch(checkoutCart()).unwrap();

        console.log('Order successful:', response);
        navigate('/payment'); // Redirect to payment page

        alert('Order placed successfully!');

    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');

    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <img
                src={item.product.photo}
                alt={item.product.name}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <div className="text-gray-600">${item.product.price} each</div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() =>
                    handleQuantityChange(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() =>
                    handleQuantityChange(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div>${item.total_price.toFixed(2)}</div>
              <button
                className="ml-4 text-red-600 hover:underline"
                onClick={() => handleRemove(item.product.id)}
              >
                Remove
              </button>
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
      <h1>temporary put status component for implementation</h1>
      <OrderStatus/>
      <LiveOrderStatus orderId={1}/>
    </div>
  );
};

export default CartPage;
