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




// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchCart } from '../features/cartSlice';
// import { useEffect } from 'react';

// const useAuthAndFetchCart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const user = useSelector((state) => state.auth.user);
//   const cartStatus = useSelector((state) => state.cart.status); // Check cart fetch status

//   useEffect(() => {
//     if (user) {
//       // Fetch cart only if not already loading or succeeded
//       if (cartStatus === 'idle') {
//         dispatch(fetchCart());
//       }
//     } else {
//       navigate('/'); // Redirect unauthenticated users to home
//     }
//   }, [dispatch, user, navigate, cartStatus]); // Add cartStatus as a dependency
// };

// export default useAuthAndFetchCart;