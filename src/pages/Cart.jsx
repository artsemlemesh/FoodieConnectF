import { useDispatch, useSelector } from 'react-redux';
import {
  checkoutCart,
  fetchPageViewCount,
  removeFromCart,
  trackPageView,
  updateCartItem,
} from '../features/cartSlice';
import useAuthAndFetchCart from '../hooks/useAuthAndFetchCart';
import { useLocation, useNavigate } from 'react-router-dom';
import LiveOrderStatus from '../components/withoutStories/LiveOrderStatus';
import { useAppContext } from '../context/GlobalContext';
import PurchaseHistory from '../components/withoutStories/PurchaseHistory';
import { useEffect } from 'react';
// import OnlineUsers from '../components/withoutStories/OnlineUsers';

const CartPage = () => {
  useAuthAndFetchCart();
  const { state, setOrderId } = useAppContext();
  const orderId = state.orderId; // Access orderId from state
  console.log('orderId:', orderId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const status = useSelector((state) => state.cart);
  // console.log('status', status)
  // const cart = useSelector((state) => state.cart.items);
  // console.log('cart:', cart);

  const { items: cart, status, error } = useSelector((state) => state.cart);


///////////////////////
  // for tracking page visits, (can be done more efficiently, check later)
  const count = useSelector((state) => state.cart?.pageViewCount || 0);  // Default to 0 if undefined
  const totalCount = useSelector((state) => state.cart?.totalViews || 0);  // Default to 0 if undefined

  useEffect(() => {
    const pageUrl = window.location.pathname;  // Get the current page URL
    console.log('Page URL:', pageUrl);
    dispatch(trackPageView(pageUrl))
    dispatch(fetchPageViewCount(pageUrl));
  }, [dispatch, location.pathname]);

  console.log('Page view count!!!:', count);
  console.log('Total view count!!!:', totalCount);
/////////////////////

  // Display loading state
  if (status === 'loading') {
    return <p>Loading cart...</p>;
  }

  // Display error state
  if (status === 'failed') {
    return <p>Error loading cart: {error}</p>;
  }

  // Display empty cart message
  if (status === 'succeeded' && cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

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
      console.log('before checkout');
      const response = await dispatch(checkoutCart()).unwrap();

      console.log('Order successful:', response);
      setOrderId(response.order_id);

      navigate('/payment');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
     
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.product}`}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <img
                src={item.product?.photo || 'default-image-url.jpg'}
                alt={item.product?.name || 'Unknown Product'}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product?.name || 'Unknown Product'}</h3>
                <div className="text-gray-600">${item.product?.price || '0.00'} each</div>
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
              <div>${item.total_price}</div>
              <button
                className="ml-4 text-red-600 hover:underline"
                onClick={() => handleRemove(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-right text-xl font-bold">
            Total: ${cartTotal.toFixed(2) || '0.00'}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      
      
      {orderId && <LiveOrderStatus orderId={orderId} />} 
      <PurchaseHistory />
      {/* <OnlineUsers/> */}
    </div>
  );
};

export default CartPage;
