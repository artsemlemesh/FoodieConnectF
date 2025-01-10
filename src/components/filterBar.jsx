import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../graphql/queries';

const FilterBar = ({ onCategoryChange }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => handleCategoryClick('')}
        className={`py-2 px-4 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      {data.allCategories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`py-2 px-4 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;