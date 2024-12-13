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
import LiveOrderStatus from './components/withoutStories/LiveOrderStatus';
import RestaurantDetailsPage from './pages/Restaurant';
import RestaurantList from './pages/RestaurantsList';
import Dashboard from './pages/Dashboard';
import { rawRoutes } from './utils/routesConfig';

const routeComponents = {
  '': <Home />,
  about: <About />,
  contact: <Contact />,
  'order-food': <OrderFood />,
  '/cart': <CartPage />,
  '/success': <SuccessPage />,
  '/cancel': <CancelPage />,
  '/payment': <PaymentWrapper />,
  '/orders/:orderId/track': <LiveOrderStatus />,
  '/restaurants': <RestaurantList />,
  '/restaurants/:id': <RestaurantDetailsPage />,
  '/dashboard': <Dashboard />,
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {rawRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<MainLayout />}>
              {route.children.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={routeComponents[child.path]}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
