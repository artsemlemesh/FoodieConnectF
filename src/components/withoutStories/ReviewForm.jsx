import React, { useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const ReviewForm = ({ restaurantId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

// when replacing it with graphQL use refetch after creating a review, so then ill be able to see new reviews when go to the approve reviews page
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post('/reviews/reviews/create/ ', {
        restaurant: restaurantId,
        rating,
        comment,
      });

      alert('Review submitted! Pending approval.');
      setComment('')
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg shadow-lg max-w-md mx-auto bg-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave a Review</h2>

      {/* Rating Section */}
      <label htmlFor="rating" className="block font-medium text-gray-700 mb-2">
        Rating:
      </label>
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className="text-2xl text-yellow-400 focus:outline-none"
          >
            {star <= rating ? <AiFillStar /> : <AiOutlineStar />}
          </button>
        ))}
      </div>

      {/* Comment Section */}
      <label htmlFor="comment" className="block font-medium text-gray-700 mb-2">
        Comment:
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        placeholder="Write your review here..."
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
      ></textarea>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;