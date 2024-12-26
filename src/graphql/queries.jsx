// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders {
    allOrders {
      id
      totalAmount
      status
      user {
        id
        username
        email
      }
      restaurant {
        description
      }
    }
  }
`;

export const GET_DATA = gql`
  query GetData {
    allOrders {
      id
      createdAt
      status
      totalAmount
      eta
      restaurant {
        name
        description
        address
        owner {
          id
          username
        }
      }
    }
  }
`;
