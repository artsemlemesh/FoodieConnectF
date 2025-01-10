import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { FixedSizeGrid as Grid } from 'react-window';
import { GET_PRODUCTS } from '../graphql/queries';
import ProductCar from './withoutStories/ProductCard';
import FilterBar from './filterBar';

const HomePage = () => {
  const [filters, setFilters] = useState({}); // Filter state for category
  const [products, setProducts] = useState([]); // Accumulated products
  const [pageInfo, setPageInfo] = useState({ endCursor: null, hasNextPage: true });

  const gridRef = useRef(null);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_PRODUCTS, {
    variables: { first: 10, after: null, filter: filters },
    fetchPolicy: 'cache-and-network',
  });

  // Load products on data fetch
  useEffect(() => {
    if (data) {
      setProducts((prevProducts) =>
        pageInfo.endCursor
          ? [...prevProducts, ...data.allProducts.edges.map((edge) => edge.node)]
          : data.allProducts.edges.map((edge) => edge.node)
      );
      setPageInfo(data.allProducts.pageInfo);
    }
  }, [data]);

  const loadMore = () => {
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
    setProducts([]); // Clear previous results
    if (gridRef.current) gridRef.current.scrollToItem({ rowIndex: 0 }); // Reset scroll position
  };

  // React-window Cell Renderer
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const productIndex = rowIndex * 4 + columnIndex; // Assuming 4 columns
    if (productIndex >= products.length) return null;

    const product = products[productIndex];
    return (
      <div style={style}>
        <ProductCar product={product} />
      </div>
    );
  };

  // Trigger loading more when scrolling near the bottom
  const handleScroll = ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) => {
    if (scrollDirection === 'forward' && !scrollUpdateWasRequested) {
      const totalHeight = products.length / 4 * 200; // Assuming 200px row height
      const scrollThreshold = totalHeight - 800; // Load more when 800px near the bottom
      if (scrollOffset > scrollThreshold) {
        loadMore();
      }
    }
  };

  if (loading && products.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <FilterBar onCategoryChange={handleCategoryChange} />
      <Grid
        ref={gridRef}
        className="grid"
        columnCount={4}
        columnWidth={300} // Adjust based on card size
        height={600}
        rowCount={Math.ceil(products.length / 4)}
        rowHeight={200}
        width={1200} // Adjust based on container size
        onScroll={handleScroll}
      >
        {Cell}
      </Grid>
      {!pageInfo.hasNextPage && (
        <div className="mt-4 text-center text-gray-500">No more products to load.</div>
      )}
    </div>
  );
};

export default HomePage;