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

  const cart = useSelector((state) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (data) => {
    const { username, password1 } = data; //extract name and pass
    try {
      await dispatch(loginUser({ username, password1 })).unwrap();
      closeModal();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleRegister = async (data) => {
    const { username, email, password1, password2 } = data;

    try {
      dispatch(registerUser({ username, email, password1, password2 })).unwrap();
      closeModal()
    } catch (err) {
      console.error('Login failed:', err);
    }
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
        cart,
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
