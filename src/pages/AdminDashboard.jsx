import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/GlobalContext';
import useAuthAndFetchCart from '../hooks/useAuthAndFetchCart';
import Header from '../components/Header';
import PendingReviews from '../components/AdminPanel/ApproveReview';

const AdminDashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useAuthAndFetchCart();

  useEffect(() => {
    if (!user?.is_admin) {
      console.log('No admin access');
      navigate('/'); // Redirect to the home page if user is not an admin
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Dashboard
        </h1>

        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <nav className="admin-sidebar bg-white shadow-lg rounded-lg p-6 w-1/4 h-[40vh] ">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Navigation
            </h2>
            <ul className="space-y-4">
  <li>
    <NavLink
      to="/admin/dashboard"
      className={({ isActive }) =>
        isActive
          ? "text-blue-800 font-semibold border-b-2 border-blue-800"
          : "text-blue-600 hover:underline"
      }
    >
      Statistics
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/admin/users"
      className={({ isActive }) =>
        isActive
          ? "text-blue-800 font-semibold border-b-2 border-blue-800"
          : "text-blue-600 hover:underline"
      }
    >
      Users
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/admin/orders"
      className={({ isActive }) =>
        isActive
          ? "text-blue-800 font-semibold border-b-2 border-blue-800"
          : "text-blue-600 hover:underline"
      }
    >
      Orders
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/admin/restaurants"
      className={({ isActive }) =>
        isActive
          ? "text-blue-800 font-semibold border-b-2 border-blue-800"
          : "text-blue-600 hover:underline"
      }
    >
      Restaurants
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/admin/products"
      className={({ isActive }) =>
        isActive
          ? "text-blue-800 font-semibold border-b-2 border-blue-800"
          : "text-blue-600 hover:underline"
      }
    >
      Products
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/admin/create-restaurant"
      className={({ isActive }) =>
        isActive
          ? "text-blue-800 font-semibold border-b-2 border-blue-800"
          : "text-blue-600 hover:underline"
      }
    >
      Create Restaurant
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/admin/create-product"
      className={({ isActive }) =>
        isActive
          ? "text-blue-800 font-semibold border-b-2 border-blue-800"
          : "text-blue-600 hover:underline"
      }
    >
      Create Product
    </NavLink>
  </li>
</ul>
          </nav>

          {/* Main Content Area */}
          <div className="admin-content flex-1 p-6 bg-white shadow-lg rounded-lg h-[40vh] overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <PendingReviews />
      </div>
    </div>
  );
};

export default AdminDashboard;
