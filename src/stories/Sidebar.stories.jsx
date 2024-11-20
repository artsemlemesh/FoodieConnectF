import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
};

const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'Restaurants', link: '/restaurants' },
  { label: 'Orders', link: '/orders' },
];

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Toggle Sidebar
      </button>
      <Sidebar {...args} isOpen={isOpen} menuItems={menuItems} />;
    </div>
  );
};


export const Default = Template.bind({});
Default.args = {};
