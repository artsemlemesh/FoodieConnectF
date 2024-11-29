import React from 'react';

import { useAppContext } from '../context/GlobalContext';

const Home = () => {
  // const {} = useAppContext();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Welcome to FoodieConnect</h2>
      <p className="mt-2 text-gray-600">
        Discover the best food delivery options near you.
      </p>
    </div>
  );
};

export default Home;
