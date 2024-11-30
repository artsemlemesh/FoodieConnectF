import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../features/cartSlice';
import { useEffect } from 'react';

const useAuthAndFetchCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    } else {
      navigate('/');
    }
  }, [dispatch, user, navigate]);
};

export default useAuthAndFetchCart;
