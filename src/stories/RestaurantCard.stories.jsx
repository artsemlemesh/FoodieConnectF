import RestaurantCard from '../components/RestaurantCard';

 //card is incomplete, so we need to create a story for it

export default {
  title: 'Molecules/RestaurantCard',
  component: RestaurantCard,
};

const Template = (args) => <RestaurantCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Sushi World',
  image: 'https://source.unsplash.com/300x200/?sushi',
  rating: 4.5,
  cuisine: 'Italian',
};
