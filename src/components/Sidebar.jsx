import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, menuItems }) => {
  return (
    <motion.div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 z-50 shadow-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -500 }}//fix here
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="p-4 text-lg font-bold">FoodieConnect</div>
      <nav className="space-y-2 p-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;