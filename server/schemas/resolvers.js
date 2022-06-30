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
        login: {

        },
        saveBook: {

        },
        deleteBook: {
            
        },

    }

}