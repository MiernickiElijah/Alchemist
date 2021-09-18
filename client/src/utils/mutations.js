import { gql } from '@apollo/client';



export const ADD_USER = gql`
    mutation addUser($username: String!, $password : String!, $email : String!) {
        addUser (email : $email, password : $password, username : $username) {
            user {
                _id 
                username
                email
                }
            token
        }
    }
`;

export const LOGIN_USER = gql`
 mutation login($email : String!, $password : String!) {
     user {
         _id
         username
     }
     token
 }
`;

export const SAVE_BOOK = gql`
 mutation saveBook($bookId : String!, $_id : ID!)
 saveBook(bookId: $bookId, _id : $ID) {
    user {
        _id
        username
        bookInput {
            bookId
            authors
            description
            image
            link
            title
        }
    token
    }
 }
`;

export const REMOVE_BOOK = gql`
 mutation removeBook($bookId: String!, $_id : ID!)
 removeBook(bookId: $bookId, _id : $ID) {
        user {
            _id
            username
            bookInput {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    token
    }
 }
`;