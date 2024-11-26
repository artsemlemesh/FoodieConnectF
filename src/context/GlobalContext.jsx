import { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/authSlice';
import store from '../store/store';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (data) => {
    const { username, password1 } = data; //extract name and pass
    // Dispatch the login action with the provided credentials
    dispatch(loginUser({ username, password1 }));
    console.log('Login action dispatched with:', { username, password1 });
    console.log('Current state:', store.getState());
  };

  const handleRegister = (data) => {
    const { username, email, password1, password2 } = data;

    // Dispatch the login action with the provided credentials
    dispatch(registerUser({ username, email, password1, password2 }));
    console.log('Register action dispatched with:', {
      username,
      email,
      password1,
      password2,
    });
    console.log('Current state:', store.getState());
  };

  const toggleFormType = () => {
    setIsLogin(!isLogin); // Toggle between login and register
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        error,
        authStatus,
        isLogin,
        setIsLogin,
        handleLogin,
        handleRegister,
        toggleFormType,

        openModal,
        closeModal,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
