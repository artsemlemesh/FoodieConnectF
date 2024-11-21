import React from 'react';
import MyCardGroup from '../../components/MyCards/MyCardGroup';

export default {
  title: 'Organisms/MyCardGroup',
  component: MyCardGroup,
};

const cards = [
  {
    title: 'Restaurant A',
    description: 'Delicious meals with top chefs.',
    image: 'https://source.unsplash.com/400x200/?food',
    onButtonClick: () => alert('Restaurant A clicked!'),
  },
  {
    title: 'Restaurant B',
    description: 'Fine dining in a modern setting.',
    image: 'https://source.unsplash.com/400x200/?dining',
    onButtonClick: () => alert('Restaurant B clicked!'),
  },
  {
    title: 'Restaurant C',
    description: 'Cozy place with authentic cuisine.',
    image: 'https://source.unsplash.com/400x200/?cuisine',
    onButtonClick: () => alert('Restaurant C clicked!'),
  },
];

const Template = (args) => <MyCardGroup {...args} />;


export const Default = Template.bind({});
Default.args = {
  cards,
};