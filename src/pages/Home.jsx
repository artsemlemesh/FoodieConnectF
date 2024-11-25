import React, { useState } from 'react';
import AuthForm from '../components/MyCards/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/authSlice';
import store from '../store/store';
import { Button } from 'reactstrap';

const Home = () => {

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true)
  const user = useSelector((state) => state.auth.user); // Get the user state from Redux

  const handleLogin = (data) => {
    const {username, password1} = data //extract name and pass
    // Dispatch the login action with the provided credentials
    dispatch(loginUser({ username, password1 }));
    console.log('Login action dispatched with:', { username, password1 });
    console.log('Current state:', store.getState());

  };
  const handleRegister = (data) => {
    const {username, email, password1, password2} = data 

    // Dispatch the login action with the provided credentials
    dispatch(registerUser({ username, email, password1, password2 }));
    console.log('Register action dispatched with:', { username, email, password1, password2 });
    console.log('Current state:', store.getState());

  };
  const toggleFormType = () => {
    setIsLogin(!isLogin); // Toggle between login and register
  };
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Welcome to FoodieConnect</h2>
      <AuthForm type={ isLogin ? 'login':'register'} onSubmit={isLogin? handleLogin : handleRegister}/>
      {!user && (
        <Button onClick={toggleFormType} className="mt-4">
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </Button>
      )}
      <p className="mt-2 text-gray-600">Discover the best food delivery options near you.</p>
    </div>
  );
};

export default Home;

//add sign in /up modal for the header