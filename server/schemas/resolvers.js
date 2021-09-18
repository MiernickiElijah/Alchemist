const { User } = require('../models');
const { signToken } = require('../utils/auth')
const { findByIdAndUpdate } = require('../models/User');
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    //get single user//
    Query: {
        User: async (parent, { _id, email }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : _id }, { username: username }],
            });
            if (!foundUser) {
                throw new AuthenticationError('Cannot find a user with this id!');
            }
            return foundUser;
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const User = await User.Create(args)
            const Token = signToken(User)
            return { Token, User };
        },

        login: (parent, email, password) => {
            //email check
            const User = await User.findOne(
                { email }
            )
            if (!User) {
                throw new AuthenticationError('Cannot find a user with this id!');
            }
            //password check
            const Password = await User.isCorrectPassword(password)
            if (!Password) {
                throw new AuthenticationError('NOPE!');
            }
            //get em
            const Token = signToken(User)
            return { Token, User };
        },

        saveBook: (parent, bookData, context) => {
            if (context.user) {
                const Bookworm = await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { savedBooks: bookData } }, { new: true });
                return Bookworm;
            }
            throw new AuthenticationError("Oi! This is not here");
        },

        removeBook: (parent, bookId, context) => {
            if (context.user) {
                const Bookworm = await User.findByIdAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: bookId } }, { new: true });
                return Bookworm;
            }
            throw new AuthenticationError("Oi! This is still here");
        }
    }
};

module.exports = resolvers;
