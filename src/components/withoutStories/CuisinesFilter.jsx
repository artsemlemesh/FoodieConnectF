import React from 'react';

const CuisinesFilter = ({ cuisines, selectedCuisine, onFilterChange, onResetFilters }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 mb-6">
      <button
          className="px-4  rounded-md bg-gray-400 text-gray-800 hover:bg-gray-300"
          onClick={onResetFilters}
        >
          All
        </button>
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            className={`px-4 py-2 rounded-md ${
              selectedCuisine === cuisine
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onFilterChange(cuisine)}
          >
            {cuisine}
          </button>
        ))}
        
      </div>
    </div>
  );
};

export default CuisinesFilter;