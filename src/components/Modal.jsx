import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/GlobalContext';
import { Button } from 'reactstrap';

const Modal = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;
  const { toggleFormType, user, isLogin } = useAppContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{content}</div>
        <div className="mt-6 text-right">
          {!user && (
            <Button onClick={toggleFormType} className="mt-4">
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
