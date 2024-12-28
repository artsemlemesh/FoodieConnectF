import { gql } from '@apollo/client';

// Query to get chat room messages
export const GET_MESSAGES = gql`
  query GetMessages($roomId: ID!) {
    messages(roomId: $roomId) {
      id
      content
      timestamp
      user {
        id
        username
      }
    }
  }
`;

// Subscription to receive new messages
export const MESSAGE_ADDED = gql`
  subscription OnMessageAdded($roomId: ID!) {
    messageAdded(roomId: $roomId) {
      id
      content
      timestamp
      user {
        id
        username
      }
    }
  }
`;

// Mutation to send a message
export const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: ID!, $content: String!) {
    createMessage(roomId: $roomId, content: $content) {
      id
      content
      timestamp
      user {
        id
        username
      }
    }
  }
`;