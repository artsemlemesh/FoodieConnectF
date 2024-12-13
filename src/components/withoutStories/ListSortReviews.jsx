import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const ReviewsList = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  console.log('REVIEWS',reviews)

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axiosClient.get(`/reviews/reviews/${restaurantId}/`);
      console.log('RESPONSE',response.data)
      setReviews(response.data);
    };
    fetchReviews();
  }, [restaurantId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="border-b py-2">
          <p>
            <strong>{review.user}</strong> - {review.rating}★
          </p>
          <p>{review.comment}</p>
          <small>{new Date(review.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;