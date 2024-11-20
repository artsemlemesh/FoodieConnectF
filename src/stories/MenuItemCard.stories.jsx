import MenuItemCard from '../components/MenuItemCard';

export default {
  title: 'Molecules/MenuItemCard',
  component: MenuItemCard,
};

const Template = (args) => <MenuItemCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Pizza',
  price: 10.99,
  image: 'https://via.placeholder.com/150',
  description: 'Delicious pizza with various toppings.',
  onAddToCart: () => alert('Added to cart!'),
};


export const LongDescription = Template.bind({});
LongDescription.args = {
  name: 'Hamburger',
  price: 15.99,
  image: 'https://via.placeholder.com/150',
  description: 'Delicious hamburger with various toppings. Delicious hamburger with various toppings.Delicious hamburger with various toppings.Delicious hamburger with various toppings.',
  onAddToCart: () => alert('Added to cart!'),
};
