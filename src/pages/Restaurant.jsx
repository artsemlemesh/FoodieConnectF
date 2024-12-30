import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import ReviewsList from '../components/withoutStories/ListSortReviews';
import ReviewForm from '../components/withoutStories/ReviewForm';

const RestaurantDetailsPage = () => {
  const { id } = useParams(); //get user id from url

  const [restaurant, setRestaurant] = useState(null);
  console.log('rest', restaurant)

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
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8">
      {/* Restaurant Header */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-800">{restaurant.name}</h1>
        <p className="text-gray-600 mt-4">{restaurant.description}</p>
      </div>

      {/* Review Form */}
      <div className="border-b pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Review</h2>
        <ReviewForm restaurantId={id} onAddReview={handleAddReview} />
      </div>

      {/* Review List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
        <ReviewsList restaurantId={id} />
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;