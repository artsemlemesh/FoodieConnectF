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


export const APPROVE_REVIEW = gql`
  mutation ApproveReview($review_id: ID!) {
    approveReview(reviewId: $review_id) {
      success
      message
      review {
        id
        isApproved
      }
    }
  }
`;



export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
  $name: String!
  $price: Decimal!
  $description: String!
  $category: String!
) {
  createProduct(
    name: $name
    price: $price
    description: $description
    category: $category
  ) {
    product {
      id
      name
      price
    }
  }
}
`;

// export const CREATE_PRODUCT = gql`
//   mutation CreateProduct(
//   $name: String!
//   $price: Decimal!
//   $description: String!
//   $category: String!
//   $photo: Upload
// ) {
//   createProduct(
//     name: $name
//     price: $price
//     description: $description
//     category: $category
//     photo: $photo
//   ) {
//     product {
//       id
//       name
//       price
//     }
//   }
// }
// `;