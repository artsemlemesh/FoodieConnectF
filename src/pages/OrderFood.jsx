import React from 'react';

// FoodItem Component
// FoodItem Component
  <div className="border rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
    <img
      // src={`https://source.unsplash.com/400x300/?food&sig=${index}`}
      alt={`Food ${index}`}
      className="w-full h-32 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold">Food Item {index + 1}</h3>
      <p className="text-sm text-gray-500">Delicious and tasty food.</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-blue-500 font-bold">$10.99</span>
        {/* Updated Button */}
        <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

// FoodChoices Component
const FoodChoices = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-bold mb-4">Choose Your Food</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <FoodItem key={index} index={index} />
      ))}
    </div>
  </div>
);

// CartItem Component
const CartItem = ({ index }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div>
      <h4 className="font-bold">Food Item {index + 1}</h4>
      <p className="text-sm text-gray-500">Quantity: 1</p>
    </div>
    <span className="text-blue-500 font-bold">$10.99</span>
  </div>
);

// CartSummary Component
const CartSummary = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-bold mb-4">Your Cart</h2>
    <div className="space-y-4">
      {[...Array(2)].map((_, index) => (
        <CartItem key={index} index={index} />
      ))}
    </div>
    <div className="mt-6 flex justify-between items-center text-lg font-bold">
      <span>Total:</span>
      <span>$21.98</span>
    </div>
    <button className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600">
      Proceed to Checkout
    </button>
  </div>
);

// Main OrderFood Component
const OrderFood = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Food Choices Section */}
      <div className="lg:col-span-8">
        <FoodChoices />
      </div>

      {/* Cart Summary Section */}
      <div className="lg:col-span-4">
        <CartSummary />
      </div>
    </div>
  );
};

export default OrderFood;