import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RESTAURANT } from '../graphql/mutations';
import { useAppContext } from '../context/GlobalContext';

const CreateRestaurantForm = () => {
  const { user, openModal } = useAppContext();

  console.log('userID', user);

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    address: '',
  });

  const [createRestaurant, { data, loading, error }] = useMutation(
    CREATE_RESTAURANT,
    {
      onCompleted: () => {
        setFormState({
          name: '',
          description: '',
          address: '',
        });
      },
    }
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      openModal()
      return;
    }
    createRestaurant({
      variables: {
        name: formState.name,
        description: formState.description,
        address: formState.address,
        ownerId: user.id,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Create a New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={formState.description}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Address"
          value={formState.address}
          onChange={(e) =>
            setFormState({ ...formState, address: e.target.value })
          }
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          Restaurant created successfully: {data.createRestaurant.restaurant.name}
        </p>
      )}
    </div>
  );
};

export default CreateRestaurantForm;
