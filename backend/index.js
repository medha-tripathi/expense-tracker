import { ApolloServer } from "@apollo/server"
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typedefs/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connectdb.js";
import passport from "passport";
import session from "express-session";
import ConnectMongo from "connect-mongodb-session";
import { buildContext } from 'graphql-passport'
import { configurePassport } from "./passport/passport.config.js";


dotenv.config();
configurePassport();

const app = express()

const httpServer = http.createServer(app);

const MongoDBStore = ConnectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error",(err)=>console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start(); 

app.use(
  '/',
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  }),
  express.json(),
  expressMiddleware(server,{
    context: async({ req, res })=>buildContext({req, res}),
  })
);

await new Promise((resolve)=>httpServer.listen({port:4000},resolve));
await connectDB();

console.log(`🚀 Server ready`)