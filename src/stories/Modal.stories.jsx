import { useState } from 'react';
import Modal from '../components/Modal';
 //modal is incomplete, so we need to create a story for it

export default {
  title: 'Molecules/Modal',
  component: Modal,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Sample Modal',
  content: 'This is a sample modal content.',
};
