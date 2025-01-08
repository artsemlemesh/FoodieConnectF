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
export const GET_PRODUCTS = gql`
  query GetProducts {
    allProducts {
      id
      name
      price
      description
      photo
      category 
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews{
    pendingReviews {
      id
      user {
        username
      }
      restaurant {
        name
      }
      rating
      comment
      isApproved
    }
  }
`;
