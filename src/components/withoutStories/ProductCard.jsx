import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const { name, price, description, photo } = product;

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <img
        src={photo}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;