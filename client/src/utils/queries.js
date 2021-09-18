import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query getUser {
      user {
        _id 
        username
        email
        savedBooks {
            author
            description
            bookId
            link
            title
            image
        }
        bookCount
      }
  }
`;

