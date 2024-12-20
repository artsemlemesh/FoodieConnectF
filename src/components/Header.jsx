import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/GlobalContext';

const Header = () => {
  const { user, openModal } = useAppContext();


  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">FoodieConnect</h1>
        <nav className="space-x-4">
          {user ? (
            <span onClick={openModal} className="hover:underline">
              Welcome, {user.username}
            </span>
          ) : (
            <button onClick={openModal} className="hover:underline">
              Login/Register
            </button>
          )}
          {/* Manually adding navigation links for each route */}
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
          <NavLink to="/order-food" className="hover:underline">
            Order Food
          </NavLink>
          <NavLink to="/cart" className="hover:underline">
            Cart
          </NavLink>
          {/* <NavLink to="/success" className="hover:underline">
            Success
          </NavLink>
          <NavLink to="/cancel" className="hover:underline">
            Cancel
          </NavLink>
          <NavLink to="/payment" className="hover:underline">
            Payment
          </NavLink> */}
          <NavLink to="/orders/:orderId/track" className="hover:underline">
            Order Tracking
          </NavLink>
          <NavLink to="/restaurants" className="hover:underline">
            Restaurants
          </NavLink>
          {/* <NavLink to="/restaurants/:id" className="hover:underline">
            Restaurant Details
          </NavLink> */}
          <NavLink to="/dashboard" className="hover:underline">
            Dashboard
          </NavLink>
          <NavLink to="/admin" className="hover:underline">
            Admin Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;