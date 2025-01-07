import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/withoutStories/ProductCard';
import CuisinesFilter from '../components/withoutStories/CuisinesFilter';
import { addToCart } from '../features/cartSlice';
import { fetchProducts } from '../features/productSlice';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { useAppContext } from '../context/GlobalContext';
import { useCallback } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon

const HomePage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); // Live search term
  const [columnCount, setColumnCount] = useState(4);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { user, openModal } = useAppContext();

  const products = useSelector((state) => state.product.items);
  const cuisines = Array.from(new Set(products.map((product) => product.category)));

  const [cardDimensions, setCardDimensions] = useState({
    width: 270,
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const updateGridDimensions = debounce(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const minCardWidth = 270;
        const newColumnCount = Math.max(Math.floor(containerWidth / minCardWidth), 1);
        const adjustedCardWidth = containerWidth / newColumnCount;

        setColumnCount(newColumnCount);
        setGridWidth(containerWidth);
        setCardDimensions({ width: adjustedCardWidth });
      }
    }, 300);

    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);

    return () => {
      window.removeEventListener('resize', updateGridDimensions);
      updateGridDimensions.cancel();
    };
  }, []);

  const handleFilterChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, 300);

  const filteredProducts = products.filter((product) => {
    const matchesCuisine = selectedCuisine === 'All' || product.category === selectedCuisine;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    return matchesCuisine && matchesSearch;
  });

  const handleAddToCart = useCallback(
    (product) => {
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
    },
    [user, openModal, dispatch]
  );

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
      <div style={{ ...style, padding: '8px' }} className="p-2 flex justify-center items-center">
        <ProductCard product={product} onAddToCart={handleAddToCart} />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Cuisines</h1>
        
        <div className="relative flex items-center space-x-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <CuisinesFilter
        cuisines={cuisines}
        selectedCuisine={selectedCuisine}
        onFilterChange={handleFilterChange}
        onResetFilters={() => {
          setSelectedCuisine('All');
          setSearchTerm('');
        }}
      />

      <div ref={containerRef} className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-lg bg-white">
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
                style={{ willChange: 'transform' }}
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