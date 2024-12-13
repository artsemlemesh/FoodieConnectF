import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import ReviewsList from '../components/withoutStories/ListSortReviews';
import ReviewForm from '../components/withoutStories/ReviewForm';

const RestaurantDetailsPage = () => {
  const { id } = useParams(); //get user id from url

  const [restaurant, setRestaurant] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axiosClient.get(`/reviews/restaurants/${id}/`);
        setRestaurant(restaurantResponse.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <p>{restaurant.description}</p>

      {/* Review Form */}
      <ReviewForm restaurantId={id} onAddReview={handleAddReview} /> 

      {/* Review List */}
      <ReviewsList restaurantId={id} />
    </div>
  );
};

export default RestaurantDetailsPage;