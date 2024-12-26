import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const apiUrl = import.meta.env.VITE_APP_API_URL;


const httpLink = createHttpLink({
    uri: `${apiUrl}/graphql/`, // Your GraphQL endpoint
    
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('access_token'); // Retrieve token
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export default client;