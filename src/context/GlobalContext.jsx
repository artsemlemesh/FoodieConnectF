import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/authSlice';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const [state, setState] = useState({
    orderId: null,
  });

  // Restore state from localStorage if available
  useEffect(() => {
    const storedOrderId = localStorage.getItem('orderId');
    if (storedOrderId) {
      setState((prev) => ({
        ...prev,
        orderId: storedOrderId, // Restore orderId into context
      }));
    }
  }, []);

  // Update localStorage whenever orderId changes
  useEffect(() => {
    if (state.orderId) {
      localStorage.setItem('orderId', state.orderId);
    } else {
      localStorage.removeItem('orderId'); // Clean up if no orderId
    }
  }, [state.orderId]);
  const setOrderId = (id) => {
    console.log('Updating orderId to:', id);

    setState((prev) => ({
      ...prev,
      orderId: id,
    }));
  };

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
      dispatch(
        registerUser({ username, email, password1, password2 })
      ).unwrap();
      closeModal();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const toggleFormType = () => setIsLogin((prev) => !prev);

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

        state,
        setOrderId,
        setState,
      }}
    >
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
