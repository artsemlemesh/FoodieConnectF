import React, { memo } from 'react';

const ProductCard = memo(({ product, onAddToCart }) => {
  const { name, price, description, photo } = product;

  return (
    
    <div className="border rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 flex flex-col h-80">
      {/* Fixed height ensures consistent card size */}
      <img
        src={photo}
        alt={name}
        loading="lazy"

        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        {/* Limit description height */}
        <p className="text-sm text-gray-500 mt-2 flex-grow overflow-hidden max-h-12">
          {description.length > 50
            ? `${description.slice(0, 47)}...`
            : description}
        </p>
        <div className="flex  justify-between items-center mt-4">
          <span className="text-blue-500 font-bold">${Math.floor(price)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
})

export default ProductCard;