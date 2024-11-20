import OrderTracker from '../components/OrderTracker';

export default {
  title: 'Organisms/OrderTracker',
  component: OrderTracker,
};

const stages = ['Order Placed', 'Preparing', 'On the Way', 'Delivered'];

const Template = (args) => <OrderTracker {...args} />;

export const Default = Template.bind({});
Default.args = {
  stages,
  currentStage: 2,
};
export const First = Template.bind({});
First.args = {
  stages,
  currentStage: 1,
};
export const Last = Template.bind({});
Last.args = {
  stages,
  currentStage: 3,
};
