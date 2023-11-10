const {User, Book} = require('../models');
const { withAuth } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context, info) => {
            // If there's a user in the context, return the data for that user
            const currentUser = context.currentUser;
            if (!currentUser) {
              throw new Error('Not authenticated');
            }
            return currentUser;
          },
          users: async () => {
            // Fetch all users from the database
            return await User.find();
          },
          user: async (parent, { username }) => {
            // Fetch a user by username from the database
            return await User.findOne({ username });
          },
          books: async (parent, { username }) => {
            // Fetch books by username from the database
            const user = await User.findOne({ username });
            return user.savedBooks;
          },
          book: async (parent, { bookId }) => {
            // Fetch a book by bookId from the database
            return await Book.findOne({ bookId });
          }
          },
   
    Mutation: {
        login: async (parent, args) => {
            // Call the login function here
            const user = await login(args);
            return user;
        },
        addUser: async (parent, args) => {
            // Call the createUser function here
            const user = await createUser(args);
            return user;
        },
        saveBook: async (parent, args) => {
            // Call the saveBook function here
            const user = await saveBook(args);
            return user;
        },
        removeBook: async (parent, args) => {
            // Call the deleteBook function here
            const user = await deleteBook(args);
            return user;
        },
     },
     
}

module.exports = resolvers;