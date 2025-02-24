import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axiosClient.get('/reviews/restaurants/');
      console.log('RESTAURANTSS', response.data)
      setRestaurants(response.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-6xl"> {/* container - centers the content horizontally and applies max width to the element, typically for wrapping main content of a page */}
    {/* Page Header */}
    <h1 className="text-4xl font-bold text-gray-800 mb-8">Explore Restaurants</h1>

    {/* Restaurant Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  {/* grid- enables grid based layout capabilities (css grid layout) */}
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200" 
        > {/* rounded-lg = border radius/ transition - specifies which properties should transition when they change */}
          <Link to={`/restaurants/${restaurant.id}`}>
            <img
              src={restaurant.photo || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={restaurant.name}
              className="w-full h-40 object-cover rounded-t-lg"     
            />{/* w-full= sets the width of the element to 100% of its parent container/ object-cover-ensures that the content covers the entire element while maintaining its aspect ratio */}
          </Link>
          <div className="p-4">
            <Link to={`/restaurants/${restaurant.id}`} className="block">
              <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-500">
                {restaurant.name}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">
              {restaurant.description || "A great place to enjoy delicious food."}
            </p>
            <div className="mt-4 flex justify-between items-center"> {/* flex-enables flexbox layout for the element/ items-center = vertically centers the items within the flex container */}
              <span className="text-gray-700">📍 {restaurant.address || "Unknown Location"}</span>
              <Link
                to={`/restaurants/${restaurant.id}`}
                className="text-blue-500 hover:text-blue-700 underline"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default RestaurantList;