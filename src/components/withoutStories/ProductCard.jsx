import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const { name, price, description, photo } = product;

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
      <img
        src={photo}
        alt={name}
        className="w-full h-40 object-cover rounded-t-lg "
      />
          <div className="p-4">

      <h3 className="text-lg font-semibold">{name}</h3>
      {/* <p className="text-gray-600">${Math.floor(price)}</p> */}
      <p className="text-sm text-gray-500 mt-2">{description}</p>

      <div className="flex justify-between items-center mt-4">
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
};

export default ProductCard;
