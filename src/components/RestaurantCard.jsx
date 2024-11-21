import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const RestaurantCard = ({ name, image, rating, cuisine, onClick }) => {
  return (
    <div
      className="group cursor-pointer border rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-500">
          {name}
        </h3>
        <p className="text-sm text-gray-500">{cuisine}</p>
        <div className="flex items-center space-x-1 mt-2">
          <FaStar className="text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">{rating}</span>
        </div>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  cuisine: PropTypes.string,
  onClick: PropTypes.func,
};

export default RestaurantCard;