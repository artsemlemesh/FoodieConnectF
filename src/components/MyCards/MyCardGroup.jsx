import React from 'react';
import MyCard from './MyCard';

const MyCardGroup = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <MyCard key={index} {...card} />
      ))}
    </div>
  );
};

export default MyCardGroup;