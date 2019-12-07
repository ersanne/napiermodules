import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import {graphqlExpress} from "apollo-server-express/dist/expressApollo";
// import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import './utils/mongo';
import schema from './schema';

dotenv.config();

const app = express();

// const validateToken = authToken => {
//     // ... validate token and return a Promise, rejects in case of an error
// };
//
// const findUser = authToken => {
//     return tokenValidationResult => {
//         // ... finds user by auth token and return a Promise, rejects in case of an error
//     };
// };

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development',
    introspection: true,
    tracing: true,
    // subscriptions: {
    //     onConnect: (connectionParams, webSocket) => {
    //         if (connectionParams.authToken) {
    //             return validateToken(connectionParams.authToken)
    //                 .then(findUser(connectionParams.authToken))
    //                 .then(user => {
    //                     return {
    //                         currentUser: user,
    //                     };
    //                 });
    //         }
    //
    //         throw new Error('Missing auth token!');
    //     }
    // }
});

server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
    onHealthCheck: () =>
        // eslint-disable-next-line no-undef
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});

app.listen({port: process.env.PORT}, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
    console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});