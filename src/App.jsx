import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnimatedComponent from './components/testComponets/AnimatedComp';
import './tailwind.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderFood from './pages/OrderFood';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
// import { useDispatch } from 'react-redux';
// import { fetchCSRFToken } from './features/authSlice';
// import { useEffect } from 'react';

function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchCSRFToken(dispatch); // Fetch CSRF token on app initialization
  // }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="order-food" element={<OrderFood />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
