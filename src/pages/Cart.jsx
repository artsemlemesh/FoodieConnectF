import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart, removeFromCart } from '../features/cartSlice';
import { useAppContext } from '../context/GlobalContext';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useAppContext();
  console.log('CART', cart)
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img
                src={item.product.photo}
                alt={item.product.name}
                width="50"
              />
              <div>{item.product.name}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Total: ${item.total_price}</div>
              <button onClick={() => handleRemove(item.product.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CartPage;
