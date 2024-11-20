import OrderSummary from '../components/OrderSummary';

export default {
  title: 'Molecules/OrderSummary',
  component: OrderSummary,
};

const items = [
  { name: 'Grilled Chicken', price: 12.99 },
  { name: 'Pasta', price: 8.99 },
];

const Template = (args) => <OrderSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  items,
  total: 21.98,
};
export const Chicken = Template.bind({});
Chicken.args = {
  items: [{ name: items[0].name, price: items[0].price }], //because it iterates over item.name and item.price so we have to pass an array of objects, not a single item
  total: items[0].price,
};
export const Empty = Template.bind({});
Empty.args = {};
