import React from 'react';
import PropTypes from 'prop-types';

const MenuItemCard = ({ name, price, image, description, onAddToCart }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-24 h-24 object-cover" />
        <div className="p-4 flex-1">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-blue-500 font-bold">${price.toFixed(2)}</span>
            <button
              onClick={onAddToCart}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
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