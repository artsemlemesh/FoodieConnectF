import React, { useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const ReviewForm = ({ restaurantId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

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
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Leave a Review</h2>
      <label>Rating:</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="block mb-2"
      />
      <label>Comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="block mb-4"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;