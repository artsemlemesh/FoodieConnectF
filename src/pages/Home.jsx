import React, { useEffect, useState } from 'react';
import ProductCard from '../components/withoutStories/ProductCard';
import CuisinesFilter from '../components/withoutStories/CuisinesFilter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { fetchProducts } from '../features/productSlice';
import OrdersGQL from '../components/grapthQLtestComponent';
import OrdersGQL2 from '../components/GraphQLtest2';
import ChatRoom from '../components/ChatRoom/ChatRoomComponet';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/GlobalContext';


const HomePage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const dispatch = useDispatch();
  const { user, openModal } = useAppContext();

  const products = useSelector((state) => state.product.items);
  const cuisines = Array.from(new Set(products.map((product) => product.category)));
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
    if (!user) {
      openModal();
      return;
    }
    const cartItem = {
      product_id: product.id,
      quantity: 1, // Default quantity
    };
    dispatch(addToCart(cartItem))
      .unwrap()
      .then((response) => {
        toast.success(`${product.name} has been added to the cart!`);
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart. Please try again.');
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




        {/* this is for sentry to trigger the error and check in console */}
        <button
          type="button"
          onClick={() => {
            throw new Error('Sentry Test Error.');
          }}
        >
          Break the world
        </button>




        {/* test components, later delete */}
        <OrdersGQL/>
        <OrdersGQL2/>
        
        <ChatRoom roomId={1}/>
        
      </div>
    </div>
  );
};

export default HomePage;