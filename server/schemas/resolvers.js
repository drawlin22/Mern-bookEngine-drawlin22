const {User, Book} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
      
        me: async (parent, args, context, info) => {
          // If there's a user in the context, return the data for that user
          const currentUser = context.user;
          if (!currentUser) {
            throw new Error('Not authenticated');
          }
          const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
          return userData;
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
       
        saveBook: async (parent, args, context) => {
          // console.log(context.user, "Resolver ")
          const user = await User.findOneAndUpdate(
              {_id: context.user._id},
              {$addToSet: {savedBooks: args}},
              {new: true, runValidators: true}
          );
          return user;
      },
      removeBook: async (parent, args, context) => {
        const user = await User.findOneAndUpdate(
          {_id: context.user._id},
            {$pull: {savedBooks: {bookId: args.bookId}}},
            {new: true}
        );
        return user;
          },
        },
     
};

module.exports = resolvers;