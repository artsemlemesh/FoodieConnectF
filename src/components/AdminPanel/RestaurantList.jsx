// // src/components/RestaurantList.js
// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import { axiosClient } from '../../utils/axiosClient';

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const restaurantResponse = await axiosClient.get(`/reviews/restaurants/${id}/`);
//         setRestaurants(restaurantResponse.data);
//       } catch (error) {
//         console.error('Error fetching restaurant data:', error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleDelete = (restaurantId) => {
//     deleteRestaurant(restaurantId).then(() => {
//       setRestaurants(restaurants.filter(item => item.id !== restaurantId));
//     });
//   };

//   return (
//     <div>
//       <h2>Restaurants</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Owner</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {restaurants.map(restaurant => (
//             <tr key={restaurant.id}>
//               <td>{restaurant.name}</td>
//               <td>{restaurant.address}</td>
//               <td>{restaurant.owner}</td>
//               <td>
//                 <Button variant="danger" onClick={() => handleDelete(restaurant.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default RestaurantList;