const { AuthenticationError } = require('apollo-server-express');
//const { saveBook, deleteBook, getSingleUser } = require('../controllers/user-controller');
const { User, Book } = require('../models');
const {signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async  (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select("-__v -password")
              .populate("books");
            return userData;
          }
    
          throw new AuthenticationError("Not logged in");
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

module.exports = resolvers