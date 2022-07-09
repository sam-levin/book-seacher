const { AuthenticationError } = require('apollo-server-express');
const { saveBook, deleteBook, getSingleUser } = require('../controllers/user-controller');
const { User, Book } = require('../models');

const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return user;
            }
      
            throw new AuthenticationError('Not logged in');
          },
    },
    Mutation:  {
        createUser:  async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        saveBook: async (parent, { body }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: body } },
              { new: true }
            );
            return updatedUser;
          }
          throw new AuthenticationError("You need to be logged in!");
        },
        deleteBook: async (parent, {bookdId} , context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate (
              { _id: context.user._id },
              { $pull: { savedBooks: bookdId } },
              { new: true }
            )
          }
            
        },

    }

}