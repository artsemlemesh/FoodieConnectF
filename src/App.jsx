import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './tailwind.css'; // Your Tailwind CSS
import RestaurantDetailsPage from './pages/Restaurant';
import LiveOrderStatus from './components/withoutStories/LiveOrderStatus';
import PaymentWrapper from './utils/PaymentWrapper';
import CartPage from './pages/Cart';
import Contact from './pages/Contact';
import About from './pages/About';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './components/AdminPanel/UserList';
import ManageOrders from './components/AdminPanel/OrderList';
import OrderFood from './pages/OrderFood';
import RestaurantList from './pages/RestaurantsList';
import ManageRestaurants from './components/AdminPanel/RestaurantList';
import ManageProducts from './components/AdminPanel/ProductList';
import CancelPage from './components/withoutStories/CancelPage';
import SuccessPage from './components/withoutStories/SuccessPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="order-food" element={<OrderFood />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="cancel" element={<CancelPage />} />
          <Route path="payment" element={<PaymentWrapper />} />
          <Route path="orders/:orderId/track" element={<LiveOrderStatus />} />
          <Route path="restaurants" element={<RestaurantList />} />
          <Route path="restaurants/:id" element={<RestaurantDetailsPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="restaurants" element={<ManageRestaurants />} />
          <Route path="products" element={<ManageProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;