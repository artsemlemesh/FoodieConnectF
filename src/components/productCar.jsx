import React from 'react';

const ProductCar = ({ product }) => (
  <div className="border rounded shadow p-4 flex flex-col items-center">
    <img
      src={product.photo}
      alt={product.name}
      className="h-32 w-full object-cover mb-4 rounded"
    />
    <h2 className="text-lg font-semibold">{product.name}</h2>
    <p className="text-gray-500">{product.description}</p>
    <p className="text-blue-600 font-bold">${product.price}</p>
  </div>
);

export default ProductCar;