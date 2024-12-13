import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/GlobalContext';
import { rawRoutes } from '../utils/routesConfig';

const Header = () => {
  const { user, openModal } = useAppContext();

  const excludedPaths = ['/success', '/cancel', '/payment', '/orders/:orderId/track'];
  // Filter out routes with labels for navigation links
  const navigationLinks = rawRoutes[0].children.filter((route) => route.label && !excludedPaths.includes(route.path));

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
          {navigationLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className="hover:underline">
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
