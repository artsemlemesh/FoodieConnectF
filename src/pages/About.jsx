import React from 'react';
import ProductList from '../components/PaginatedProductList';

const About = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="mt-2 text-gray-600">
        FoodieConnect connects you to the best restaurants and food delivery services in your area.
      </p>
      <ProductList />
    </div>
  );
};

export default About;