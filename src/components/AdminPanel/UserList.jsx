import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from './TableComponent';
import { fetchAllUsersProfile } from '../../features/authSlice';
import { axiosClient } from '../../utils/axiosClient';

const ManageUsers = () => {
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.auth.user); // Ensure you have users in the store
  const [allUsers, setAllUsers] = useState([])
  // console.log('users', users)
  // Define columns specific to users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const fetchUsers = async () => {
    setLoading(true)
    try{
      const response = await axiosClient.get('/users/users', {withCredentials: true})
      setAllUsers(response.data)
    }catch(error){
      console.error('Error fetching users:', error);
        setError(error.response ? error.response.data : error.message);
    } finally{
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchUsers()

  }, []); //run only on mount

  console.log('ALLUSERS', allUsers)
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  const columns = [
    { field: 'id', header: 'User ID' },
    { field: 'username', header: 'Username' },
    { field: 'email', header: 'Email' },
    // { field: 'is_active', header: 'Active' },
    { field: 'date_joined', header: 'Date Joined' },
  ];
  // const handleDelete = (userId) => {
  //   dispatch(deleteUser(userId)); // Call delete action to remove the user
  // };

  const handleDelete = async (userId) => {
    // const confirmation = window.confirm(
    //   'Are you sure you want to delete this restaurant? This action cannot be undone.'
    // );
    // if (!confirmation) return;

    try {
      await axiosClient.delete(`/users/users/${userId}/`);
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
      // alert('Restaurant deleted successfully!');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Users</h2>
      <TableComponent
        data={allUsers}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageUsers;