const {User, Book} = require('../models');
const { withAuth } = require('../utils/auth');

// import { Jwt } from 'jsonwebtoken';
// import {jwt} from '../utils/auth'
const {jwt} = require('jsonwebtoken')

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
            const token = generateToken(user);
            return { token, user };
          },
        addUser: async (parent, args) => {
          try {
            const user = await User.create(args);
            return user;
          } catch (err) {
            throw new Error('Failed to create user: ' + err.message);
          }
         },
        saveBook: async (parent, args) => {
            // Call the saveBook function here
            const user = await User.findOneAndUpdate(args);
            return user;
        },
        removeBook: async (parent, args) => {
            // Call the deleteBook function here
            const user = await User.findOneAndUpdate(args);
            return user;
        },
     },
     
}

module.exports = resolvers;