import { gql } from '@apollo/client';

export const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant(
    $name: String!
    $description: String!
    $address: String!
    $ownerId: ID!
  ) {
    createRestaurant(
      name: $name
      description: $description
      address: $address
      ownerId: $ownerId
    ) {
      restaurant {
        id
        name
        description
        address
        owner {
          id
          username
          email
        }
      }
    }
  }
`;
