import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from './TableComponent';
import {  deleteProducts, fetchProducts } from '../../features/productSlice';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items); // Ensure you have products in the store
console.log('PRODUCTS', products)
  // Define columns specific to products
  const columns = [
    { field: 'id', header: 'Product ID' },
    { field: 'name', header: 'Product Name' },
    { field: 'price', header: 'Price' },
    { field: 'category', header: 'Category' },
    { field: 'description', header: 'Description' },
  ];

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProducts(id)); // Call delete action to remove the product
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Products</h2>
      <TableComponent
        data={products}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageProducts;