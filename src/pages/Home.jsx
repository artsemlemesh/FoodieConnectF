import React, { useState } from 'react';
import AuthForm from '../components/MyCards/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/authSlice';
import store from '../store/store';
import { Button } from 'reactstrap';
import { useAppContext } from '../context/GlobalContext';
import Modal from '../components/Modal';

const Home = () => {
  const {
    handleLogin,
    handleRegister,
    toggleFormType,
    isLogin,
    setIsLogin,
    user,
    isModalOpen,
    closeModal,
  } = useAppContext();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Welcome to FoodieConnect</h2>
      
      <Modal
        title={isLogin ? 'Login' : 'Register'}
        content={
          <AuthForm
            type={isLogin ? 'login' : 'register'}
            onSubmit={isLogin ? handleLogin : handleRegister}
          />
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      

      <p className="mt-2 text-gray-600">
        Discover the best food delivery options near you.
      </p>
    </div>
  );
};

export default Home;
