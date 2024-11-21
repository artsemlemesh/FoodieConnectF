import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition"
        >
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-gray-800 ">{review.user}</h4>

            <div className="flex items-center space-x-1 text-yellow-500 px-4">
              {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string,
    })
  ).isRequired,
};

export default ReviewList;
