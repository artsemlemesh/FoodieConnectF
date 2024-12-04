import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './tailwind.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderFood from './pages/OrderFood';
import CartPage from './pages/Cart';
// import CheckoutPage from './pages/Checkout';
import SuccessPage from './components/withoutStories/SuccessPage';
import CancelPage from './components/withoutStories/CancelPage';
import PaymentWrapper from './utils/PaymentWrapper';


function App() {

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
              {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="/payment" element={<PaymentWrapper />} />
            </Route>
          </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
