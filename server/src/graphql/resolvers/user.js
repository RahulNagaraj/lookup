import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";
import { AuthenticationError, UserInputError } from "apollo-server";

import { isAdmin } from "./authorization";

const createToken = async (user, secret, expiresIn) => {
    const { id, email, username, role } = user;
    return await jwt.sign({ id, email, username, role }, secret, {
        expiresIn,
    });
};

export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll();
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findById(id);
        },
        me: async (parent, args, { models, me }) => {
            if (!me) {
                return null;
            }

            return await models.User.findById(me.id);
        },
    },

    Mutation: {
        signUp: async (
            parent,
            { firstName, lastName, email, password, role },
            { models, secret }
        ) => {
            const user = await models.User.create({
                firstName,
                lastName,
                email,
                password,
                role,
            });

            const { id } = user;
            const token = createToken(user, secret, "1h");

            return {
                user: {
                    id,
                    firstName,
                    lastName,
                    email,
                    role,
                },
                token,
            };
        },

        signIn: async (parent, { email, password }, { models, secret }) => {
            const user = await models.User.findByLogin(email);

            if (!user) {
                throw new UserInputError(
                    "No user found with this login credentials."
                );
            }

            const isValid = await user.validatePassword(password);

            if (!isValid) {
                throw new AuthenticationError("Invalid password.");
            }

            const { id, firstName, lastName, role } = user;
            const token = createToken(user, secret, "1h");

            return {
                user: {
                    id,
                    firstName,
                    lastName,
                    email,
                    role,
                },
                token,
            };
        },

        deleteUser: combineResolvers(
            isAdmin,
            async (parent, { id }, { models }) => {
                return await models.User.destroy({
                    where: { id },
                });
            }
        ),
    },
};
