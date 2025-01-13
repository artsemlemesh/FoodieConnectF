import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from '../components/withoutStories/ProductCard';
import { addToCart } from '../features/cartSlice';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { useAppContext } from '../context/GlobalContext';
import { useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import FilterBar from '../components/filterBar';
import atob from 'atob';

const HomePage = () => {
  const dispatch = useDispatch();

  const containerRef = useRef(null);

  const { user, openModal } = useAppContext();

  const [searchTerm, setSearchTerm] = useState(''); // Live search term
  const [columnCount, setColumnCount] = useState(4);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState({}); // Store filter inputs here
  const [products, setProducts] = useState([]); // Accumulated products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    endCursor: null,
    hasNextPage: true,
  });
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_PRODUCTS, {
    variables: { first: 10, after: null, filter: filters },
    fetchPolicy: 'cache-and-network',
  });

  const [cardDimensions, setCardDimensions] = useState({
    width: 270,
  });

  // Update filtered products whenever `searchTerm` or `products` changes
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    if (data) {
      setProducts(data.allProducts.edges.map((edge) => edge.node));
      setPageInfo(data.allProducts.pageInfo);
    }
  }, [data]);

  useEffect(() => {
    const updateGridDimensions = debounce(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const minCardWidth = 270;
        const newColumnCount = Math.max(
          Math.floor(containerWidth / minCardWidth),
          1
        );
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

  //to convert relay id to numeric id (was converted for relay pagination)
  function decodeRelayId(encodedId) {
    const decodedString = atob(encodedId);
    const id = decodedString.split(':').pop();
    return parseInt(id, 10);
  }

  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value.toLowerCase());
    // window.scrollTo({ top: 0, behavior: 'smooth' }) // implement smooth scroll, while searching the window doesnt go up
  }, 300);

  const handleAddToCart = useCallback(
    (product) => {
      if (!user) {
        openModal();
        return;
      }

      const numericId = decodeRelayId(product.id);

      const cartItem = {
        product_id: numericId,
        quantity: 1,
      };
      console.log('CARTITEM', cartItem),
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

  const rowCount = Math.ceil(products.length / columnCount);

  const isItemLoaded = useCallback(
    (index) => index < products.length,
    [products.length]
  );
  const loadMoreItems = () => {
    if (!pageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        first: 10,
        after: pageInfo.endCursor,
        filter: filters,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const newEdges = fetchMoreResult.allProducts.edges;
        return {
          allProducts: {
            ...fetchMoreResult.allProducts,
            edges: [...prev.allProducts.edges, ...newEdges],
          },
        };
      },
    });
  };

  const handleCategoryChange = (category) => {
    const newFilters = category ? { category } : {};
    setFilters(newFilters); // Update filter state
    refetch({ first: 10, after: null, filter: newFilters }); // Reset pagination and refetch
    setProducts([]);
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const productIndex = rowIndex * columnCount + columnIndex;
    if (productIndex >= filteredProducts.length) return null;

    const product = filteredProducts[productIndex];

    return (
      <div
        style={{ ...style, padding: '8px' }}
        className="p-2 flex justify-center items-center"
      >
        <ProductCard product={product} onAddToCart={handleAddToCart} />
      </div>
    );
  };

  if (loading && products.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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

      <FilterBar onCategoryChange={handleCategoryChange} />

      <div
        ref={containerRef}
        className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-lg bg-white"
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>

        <div className="h-full w-full overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={products.length + (pageInfo.hasNextPage ? 10 : 0)} // Add buffer for un-loaded items, fixed infinite scroll
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
                  const { visibleRowStartIndex, visibleRowStopIndex } =
                    gridProps;
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
