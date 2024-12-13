import React, { useEffect, useState } from 'react';
import ProductCard from '../components/withoutStories/ProductCard';
import CuisinesFilter from '../components/withoutStories/CuisinesFilter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { fetchProducts } from '../features/productSlice';

const HomePage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.items);
  const cuisines = products.map((product) => product.category);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleFilterChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const filteredProducts =
    selectedCuisine === 'All'
      ? products
      : products.filter((product) => product.category === selectedCuisine);

      
  const handleAddToCart = (product) => {
    const cartItem = {
      product_id: product.id,
      quantity: 1, // Default quantity
    };
    dispatch(addToCart(cartItem))
      .unwrap()
      .then((response) => {
        alert(`${product.name} has been added to the cart!`);
        // console.log('Cart updated:', response);
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      });
  };

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
