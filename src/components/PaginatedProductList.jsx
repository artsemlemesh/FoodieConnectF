import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCar from './withoutStories/ProductCard';
import FilterBar from './filterBar';
import { GET_PRODUCTS } from '../graphql/queries';



const PaginatedProductList = () => {
  const [filters, setFilters] = useState({}); // Store filter inputs here
  const [products, setProducts] = useState([]); // Accumulated products
  const [pageInfo, setPageInfo] = useState({ endCursor: null, hasNextPage: true });
console.log('products', products)
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_PRODUCTS, {
    variables: { first: 10, after: null, filter: filters },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
        console.log('Backend Response:', data);

        setProducts(data.allProducts.edges.map((edge) => edge.node));
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
  
        // Combine the previous products with the new ones, ensuring uniqueness
        // const existingIds = new Set(prev.allProducts.edges.map(edge => edge.node.id));
        // const newEdges = fetchMoreResult.allProducts.edges.filter(edge => !existingIds.has(edge.node.id));
  
        const newEdges = fetchMoreResult.allProducts.edges;


        return {
          allProducts: {
            ...fetchMoreResult.allProducts,
            edges: [
              ...prev.allProducts.edges,
              ...newEdges,
            ],
          },
        };
      },
    });
  };
  
  
  console.log("Fetching more with after:", pageInfo);
  console.log(data)
  const handleCategoryChange = (category) => {
    const newFilters = category ? { category } : {};

    setFilters(newFilters); // Update filter state
    refetch({ first: 10, after: null, filter: newFilters }); // Reset pagination and refetch
    setProducts([]); // Clear previous results
  };

  if (loading && products.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <FilterBar onCategoryChange={handleCategoryChange} />
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCar key={product.id} product={product} />
        ))}
      </div>
      {pageInfo.hasNextPage && (
        <button
          onClick={loadMore}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PaginatedProductList;