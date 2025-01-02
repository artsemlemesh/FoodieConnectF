import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/GlobalContext';
import useAuthAndFetchCart from '../hooks/useAuthAndFetchCart';
import Header from '../components/Header';

const AdminDashboard = () => {
    const { user } = useAppContext();
    const navigate = useNavigate();


    useAuthAndFetchCart();

useEffect(() => {

    if (!user?.is_admin) {
      console.log('No admin access');
      navigate('/'); // Redirect to the home page if user is not an admin
    } 
  }, [user ]);


  return (
    <div className="admin-dashboard">
      <Header/>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Sidebar Navigation */}
      <div className="flex">
        <nav className="admin-sidebar bg-gray-200 p-4 w-1/4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin/users"
                className="text-blue-600 hover:underline"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="text-blue-600 hover:underline"
              >
                Manage Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/restaurants"
                className="text-blue-600 hover:underline"
              >
                Manage Restaurants
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="text-blue-600 hover:underline"
              >
                Manage Products
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className="admin-content flex-1 p-6 bg-white shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;