import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import { AiFillStar } from "react-icons/ai";

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
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b pb-4 last:border-b-0 flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-gray-800">{review.user}</p>
                <span className="flex text-yellow-400 text-lg">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <AiFillStar key={index} />
                  ))}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <small className="text-gray-500 text-sm">
                {new Date(review.created_at).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;