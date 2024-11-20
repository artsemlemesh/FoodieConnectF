import React from 'react';
import PropTypes from 'prop-types';

const RestaurantCard = ({ name, image, rating, cuisine }) => {
  return (
    <div className="border rounded-md shadow-md">
      <img src={image} alt={name} className="rounded-t-md" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{cuisine}</p>
        <p className="text-sm text-yellow-500">⭐ {rating}</p>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number,
  cuisine: PropTypes.string,
};

RestaurantCard.defaultProps = {
  rating: 0,
  cuisine: 'Unknown',
};

export default RestaurantCard;