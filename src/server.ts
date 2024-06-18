import dotenv from "dotenv";
import restify from "restify";
import connectDb from "./database";
import logger from "./utils/logger";
import cors from "cors";
import api from "./routes/api";
import morgan from "morgan";
import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";

import corsMiddleware from "restify-cors-middleware2";

dotenv.config();

connectDb().then(() => {
  // Create server
  const server = restify.createServer({
    name: "Syncline API",
    version: "1.0.0",
    ignoreTrailingSlash: true,
  });

  // middleware

  const cors = corsMiddleware({
    origins: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
  });

  server.pre(cors.preflight);
  server.use(cors.actual);

  server.use(restify.plugins.throttle({ burst: 5, rate: 0.5, ip: true }));
  server.use(restify.plugins.bodyParser());
  // server.use(restify.plugins.multipartBodyParser());
  server.use(morgan("dev"));

  // session

  server.use(
    // @ts-ignore
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 5 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
      },
      store: connectMongo.create({ client: mongoose.connection.getClient() }),
    })
  );

  // Routes
  api.applyRoutes(server, "/api");

  server.listen(process.env.PORT || 8000, () => {
    logger.info(`Server running on port ${process.env.PORT || 8000}`);
  });
});
