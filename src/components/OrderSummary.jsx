import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCart, removeFromCart } from '../features/cartSlice';
import { useDispatch } from 'react-redux';

const OrderSummary = ({ items, total }) => {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCart())
  // }, [dispatch])

  // const handleRemove = (productId) => {
  //   dispatch(removeFromCart(productId))
  // }







  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-gray-500">No items in the order.</p>; //prevents throwing an error if items is not an array or is empty
  }


  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold">Order Summary</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-2 flex justify-between font-bold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
};

export default OrderSummary;
