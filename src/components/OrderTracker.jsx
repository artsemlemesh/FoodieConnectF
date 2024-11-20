import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const OrderTracker = ({ stages, currentStage }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center ${
              index <= currentStage ? 'text-blue-500' : 'text-gray-400'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <div
              className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${
                index <= currentStage
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-gray-100'
              }`}
            >
              {index + 1}
            </div>
            <p className="text-sm mt-2">{stage}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-full h-2 bg-gray-300 relative"
        initial={{ width: 0 }}
        animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
        transition={{ duration: 0.5 }}
        style={{
          height: '4px',
          backgroundColor: '#3b82f6',
        }}
      />
    </div>
  );
};

OrderTracker.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStage: PropTypes.number.isRequired,
};

export default OrderTracker;