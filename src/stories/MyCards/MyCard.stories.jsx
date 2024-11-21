import React from 'react';
import MyCard from '../../components/MyCards/MyCard';

export default {
  title: 'Molecules/MyCard',
  component: MyCard,
};

const Template = (args) => <MyCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Modern Restaurant',
  description: 'A cozy place for family dining and fine cuisine.',
  image: 'https://source.unsplash.com/40x20/?restaurant',
  onButtonClick: () => alert('Button Clicked!'),
};