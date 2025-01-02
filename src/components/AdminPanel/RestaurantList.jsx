import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from './TableComponent';
// import { fetchRestaurants, deleteRestaurant } from '../../features/restaurantSlice'; // Add corresponding actions
import { axiosClient } from '../../utils/axiosClient';

const ManageRestaurants = () => {
    
    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(() => {
      const fetchRestaurants = async () => {
        const response = await axiosClient.get('/reviews/restaurants/');
        setRestaurants(response.data);
      };
      fetchRestaurants();
    }, []);
console.log('restr', restaurants)
  // Define columns specific to restaurants
  const columns = [
    { field: 'id', header: 'Restaurant ID' },
    { field: 'name', header: 'Restaurant Name' },
    { field: 'description', header: 'Description' },
    { field: 'owner', header: 'Owner' },
    { field: 'created_at', header: 'Created At' },
  ];

  const handleDelete = async (restaurantId) => {
    // const confirmation = window.confirm(
    //   'Are you sure you want to delete this restaurant? This action cannot be undone.'
    // );
    // if (!confirmation) return;

    try {
      await axiosClient.delete(`/reviews/restaurants/${restaurantId}/`);
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== restaurantId)
      );
      // alert('Restaurant deleted successfully!');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant. Please try again.');
    }
  };

//   useEffect(() => {
//     dispatch(fetchRestaurants()); // Fetch restaurants when the component mounts
//   }, [dispatch]);

//   const handleDelete = (restaurantId) => {
//     dispatch(deleteRestaurant(restaurantId)); // Call delete action to remove the restaurant
//   };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Restaurants</h2>
      <TableComponent
        data={restaurants}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageRestaurants;