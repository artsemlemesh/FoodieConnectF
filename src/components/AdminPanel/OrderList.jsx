import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';
import { axiosClient } from '../../utils/axiosClient';
import { deleteOrder, fetchOrders } from '../../features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

const ManageOrders = () => {
    const orders = useSelector(state => state.orders.orders);  // Access orders from Redux store
    const dispatch = useDispatch();
    console.log('ORD', orders)
  const columns = [
    { field: 'id', header: 'Order ID' },
    { field: 'user.username', header: 'User' },
    { field: 'status', header: 'Status' },
    { field: 'total_amount', header: 'Total Amount' },
    { field: 'created_at', header: 'Created At' },
  ];

  useEffect(() => {
    dispatch(fetchOrders())
  }, []);



//   const handleEdit = (order) => {
//     console.log('Edit Order:', order);
//     // Open a modal or navigate to edit page
//   };

const handleRemove = (orderId) => {
    if (orderId) {
        dispatch(deleteOrder({ orderId }));
    } else {
        console.error("Order ID is undefined");
    }  };


  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Orders</h2>
      <TableComponent
        data={orders}
        columns={columns}
        // onEdit={handleEdit}
        onDelete={(orderId) => handleRemove(orderId)}
      />
    </div>
  );
};

export default ManageOrders;