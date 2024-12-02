import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem } from '../features/cartSlice';
import useAuthAndFetchCart from '../hooks/useAuthAndFetchCart';

const CartPage = () => {
  useAuthAndFetchCart();

  const dispatch = useDispatch();

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
        </div>
      )}
    </div>
  );
};

export default CartPage;
