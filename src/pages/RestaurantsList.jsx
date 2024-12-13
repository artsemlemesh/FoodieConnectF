import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axiosClient.get('/reviews/restaurants/');
      setRestaurants(response.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="mb-4">
            <Link to={`/restaurants/${restaurant.id}`} className="text-blue-500 underline">
              {restaurant.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;