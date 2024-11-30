import React, { useEffect, useState } from 'react';
import ProductCard from '../components/withoutStories/ProductCard';
import CuisinesFilter from '../components/withoutStories/CuisinesFilter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '../features/cartSlice';

const sampleProducts = [
  {
    id: 1,
    name: 'Cheeseburger',
    price: 9.99,
    description: 'Juicy beef patty with melted cheese on a toasted bun.',
    photo: 'https://via.placeholder.com/150',
    category: 'Sandwiches',
  },
  {
    id: 2,
    name: 'Coke',
    price: 1.99,
    description: 'Chilled soft drink to refresh your day.',
    photo: 'https://via.placeholder.com/150',
    category: 'Drinks',
  },
  {
    id: 3,
    name: 'Veggie Wrap',
    price: 7.99,
    description: 'A healthy wrap filled with fresh vegetables.',
    photo: 'https://via.placeholder.com/150',
    category: 'Sandwiches',
  },
  {
    id: 4,
    name: 'Lemonade',
    price: 2.99,
    description: 'Freshly squeezed lemonade with a tangy twist.',
    photo: 'https://via.placeholder.com/150',
    category: 'Drinks',
  },
];

const HomePage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const cuisines = ['All', 'Drinks', 'Sandwiches'];
  const dispatch = useDispatch();
  

  //FOR FETCHING FROM THE DATABASE
//   const cart = useSelector((state) => state.cart.items);
//   console.log('CARTITEMS', cart);
  
//   useEffect(() => {
//     dispatch(fetchCart());
// }, [dispatch]);

  const handleFilterChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };
  const filteredProducts =
    selectedCuisine === 'All'
      ? sampleProducts
      : sampleProducts.filter(
          (product) => product.category === selectedCuisine
        );

  const handleAddToCart = (product) => {
    console.log(`Added to cart: ${product.name}`);
    // Implement cart addition logic here
  };

  //USE IT AFTER FETCH PRODUCTS FROM THE BACKEND, NOW ITS NOT WORKING
  // const handleAddToCart = (product) => {
  //   const cartItem = {
  //     product_id: product.id,
  //     quantity: 1, // Default quantity
  //   };

  //   dispatch(addToCart(cartItem))
  //     .unwrap()
  //     .then((response) => {
  //       alert(`${product.name} has been added to the cart!`);
  //       console.log('Cart updated:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error adding to cart:', error);
  //       alert('Failed to add item to cart. Please try again.');
  //     });
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cuisines</h1>
      <CuisinesFilter
        cuisines={cuisines}
        selectedCuisine={selectedCuisine}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
