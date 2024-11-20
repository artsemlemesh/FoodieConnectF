import { useState } from 'react';
import InputField from '../components/InputField';

export default {
  title: 'Atoms/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
};

//adjusted for changing form fields template for the input field
const Template = (args) => {
  const [value, setValue] = useState('');
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args ={
    label: 'Email Address',
    placeholder: 'Enter your email address',
}