import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/withoutStories/ProductCard';
import CuisinesFilter from '../components/withoutStories/CuisinesFilter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { fetchProducts } from '../features/productSlice';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/GlobalContext';
import { useCallback } from 'react';
import { debounce } from 'lodash';

const HomePage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [columnCount, setColumnCount] = useState(4); // Default columns
  const [gridWidth, setGridWidth] = useState(window.innerWidth); // Adjusted grid width
  const containerRef = useRef(null); // Ref for grid container
  const dispatch = useDispatch();
  const { user, openModal } = useAppContext();

  const products = useSelector((state) => state.product.items);
  const cuisines = Array.from(new Set(products.map((product) => product.category)));

  const [cardDimensions, setCardDimensions] = useState({
    width: 270, // Default width
    // height: 324, // Default height (270 * 1.2)
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const updateGridDimensions = debounce(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth; // Get container width
        const minCardWidth = 270; // Minimum card width
        const newColumnCount = Math.max(Math.floor(containerWidth / minCardWidth), 1); // Columns that fit
        const adjustedCardWidth = containerWidth / newColumnCount; // Dynamically adjusted card width
  
        setColumnCount(newColumnCount);
        setGridWidth(containerWidth);
        setCardDimensions({ width: adjustedCardWidth });
      }
    }, 300); // Debounce delay for smoother resize handling
  
    updateGridDimensions(); // Initial run
    window.addEventListener('resize', updateGridDimensions);
  
    return () => {
      window.removeEventListener('resize', updateGridDimensions);
      updateGridDimensions.cancel(); // Cleanup debounce
    };
  }, []);

  const handleFilterChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const filteredProducts =
    selectedCuisine === 'All'
      ? products
      : products.filter((product) => product.category === selectedCuisine);

  const handleAddToCart = useCallback((product) => {
    if (!user) {
      openModal();
      return;
    }
    const cartItem = {
      product_id: product.id,
      quantity: 1,
    };
    dispatch(addToCart(cartItem))
      .unwrap()
      .then(() => {
        toast.success(`${product.name} has been added to the cart!`);
      })
      .catch((error) => {
        toast.error('Failed to add item to cart. Please try again.');
      });
  }, [user, openModal, dispatch]
)

  const rowCount = Math.ceil(filteredProducts.length / columnCount);

  const isItemLoaded = (index) => index < filteredProducts.length;

  const loadMoreItems = () => {
    console.log('Loading more items...');
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const productIndex = rowIndex * columnCount + columnIndex;
    if (productIndex >= filteredProducts.length) return null;

    const product = filteredProducts[productIndex];

    return (
      <div
        style={{
          ...style,
          padding: '8px',
        }}
        className="p-2 flex justify-center items-center"
      >
        <ProductCard product={product} onAddToCart={handleAddToCart} />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cuisines</h1>
      <CuisinesFilter
        cuisines={cuisines}
        selectedCuisine={selectedCuisine}
        onFilterChange={handleFilterChange}
      />

      <div
        ref={containerRef}
        className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-lg bg-white"
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>

        <div className="h-full w-full overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={rowCount * columnCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <Grid
                columnCount={columnCount}
                columnWidth={cardDimensions.width}
                height={600}
                rowCount={rowCount}
                rowHeight={340}
                width={gridWidth}
                style={{
                  willChange: 'transform',
                }}
                onItemsRendered={(gridProps) => {
                  const { visibleRowStartIndex, visibleRowStopIndex } = gridProps;
                  onItemsRendered({
                    overscanStartIndex: visibleRowStartIndex * columnCount,
                    overscanStopIndex: visibleRowStopIndex * columnCount,
                    visibleStartIndex: visibleRowStartIndex * columnCount,
                    visibleStopIndex: visibleRowStopIndex * columnCount,
                  });
                }}
                ref={ref}
              >
                {Cell}
              </Grid>
            )}
          </InfiniteLoader>
        </div>
      </div>
    </div>
  );
};

export default HomePage;