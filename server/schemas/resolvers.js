const {User, Book} = require('../models');
// const { withAuth } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require('../utils/auth');

// const {jwt, sign} = require('jsonwebtoken')

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
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
          },
        addUser: async (parent, args) => {
          try {
            const user = await User.create(args);
            const token = signToken(user);
            return {token,user};
          } catch (err) {
            throw new Error('Failed to create user: ' + err.message);
          }
         },
        saveBook: async (parent, {bookData}, context) => {
          if (context.user) {
            // Call the saveBook function here
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id }, 
              {$push: {savedBooks: bookData}},
              { new: true } 
              );
            return updatedUser;
          }
          throw new AuthenticationError('Not authenticated');
        },
        removeBook: async (parent, {bookData}, context) => {
          if (context.user) {
            // Call the deleteBook function here
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookData.bookId } } },
              { new: true }
            );
            return user;
          }
        },
     },
     
}

module.exports = resolvers;