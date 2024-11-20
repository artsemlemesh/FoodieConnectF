import Button from '../components/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {  
    layout: 'centered', //positions at the center of the page
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  variant: 'primary',
  onClick: () => alert('Primary button clicked!'), // Custom click handler

};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  variant: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Button',
  disabled: true,
};
export const Large = Template.bind({});
Large.args = {
  label: 'Large Button',
  size: 'large',
};
