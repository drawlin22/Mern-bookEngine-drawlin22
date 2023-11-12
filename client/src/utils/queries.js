import {gql} from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`;

export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};


