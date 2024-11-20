import React from 'react';
import PropTypes from 'prop-types';

const MenuItemCard = ({ name, price, image, description, onAddToCart }) => {
  return (
    <div className="flex border rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={name} className="w-24 h-24 object-cover" />
      <div className="flex-1 p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-500 font-bold">${price}</span>
          <button
            onClick={onAddToCart}
            className=" bg-blue-500 text-white rounded hover:bg-blue-600 py-2 px-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
};

export default MenuItemCard;