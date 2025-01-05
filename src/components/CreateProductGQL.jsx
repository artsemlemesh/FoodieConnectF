import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../graphql/mutations';

const CreateProductForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    // photo: null
  });

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => {
      setFormState({
        name: '',
        price: '',
        description: '',
        category: '',
        // photo: null
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting with variables:', {
        name: formState.name,
        price: parseFloat(formState.price),
        description: formState.description,
        category: formState.category,
        // photo: formState.photo, // This should be a File object
      });
    createProduct({
      variables: {
        name: formState.name,
        price: parseFloat(formState.price), // Ensure price is a number
        description: formState.description,
        category: formState.category,
        // photo: formState.photo
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Log the selected file
    setFormState({ ...formState, photo: file });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Create a New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={formState.price}
          onChange={(e) =>
            setFormState({ ...formState, price: e.target.value })
          }
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={formState.description}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={formState.category}
          onChange={(e) =>
            setFormState({ ...formState, category: e.target.value })
          }
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Create
        </button>
      </form>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}
      {data && (
        <p className="text-center text-green-500">
          Product created successfully: {data.createProduct.product.name}
        </p>
      )}
    </div>
  );
};

export default CreateProductForm;