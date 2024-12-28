import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
// import { HttpLink } from "@apollo/client/link/http";


const apiUrl = import.meta.env.VITE_APP_API_URL;


const httpLink = createHttpLink({  // or new HttpLink
    uri: `${apiUrl}/graphql/`, // Your GraphQL endpoint
    
  });

  console.log('APIURL',apiUrl);
  // WebSocket Link for subscriptions
const wsLink = new WebSocketLink({
    uri: `${apiUrl.replace('http', 'ws')}/graphql/`, // Replace http with ws for WebSocket
    options: {
      reconnect: true, // Automatically reconnect if the connection is lost
    },
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

// Use split to direct traffic based on the operation type
const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink, // Use WebSocket link for subscriptions
    authLink.concat(httpLink) // Use HTTP link for queries and mutations
  );
  



  
  const client = new ApolloClient({
    link: splitLink,    // Combined link for handling queries, mutations, and subscriptions
    cache: new InMemoryCache(),
  });

export default client;