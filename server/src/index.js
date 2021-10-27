import "dotenv/config";
import cors from "cors";
import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";

const app = express();

app.use(cors());

const getMe = async (req) => {
    const token = req.headers["x-token"];

    if (token) {
        try {
            return await jwt.verify(token, process.env.MY_SECRET);
        } catch (e) {
            throw new AuthenticationError(
                "Your session expired. Sign in again."
            );
        }
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: (error) => {
        // remove the internal sequelize error message
        // leave only the important validation error
        const message = error.message
            .replace("SequelizeValidationError: ", "")
            .replace("Validation error: ", "");

        return {
            ...error,
            message,
        };
    },
    context: async ({ req, connection }) => {
        if (connection) {
            return {
                models,
            };
        }

        if (req) {
            const me = await getMe(req);

            return {
                models,
                me,
                secret: process.env.MY_SECRET,
            };
        }
    },
});

server.applyMiddleware({ app, path: "/api" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        // createUsersWithMessages();
    }
    httpServer.listen(process.env.PORT, () => {
        console.log(`Apollo Server on http://localhost:${process.env.PORT}`);
    });
});

const createUsersWithMessages = async () => {
    await models.User.create({
        username: "rwieruch",
        email: "hello@robin.com",
        password: "rwieruch",
        role: "ADMIN",
    });

    await models.User.create({
        username: "ddavids",
        email: "hello@david.com",
        password: "ddavids",
    });
};
