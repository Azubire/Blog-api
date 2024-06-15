import dotenv from "dotenv";
import restify from "restify";
import connectDb from "./database";
import logger from "./utils/logger";
import cors from "cors";
import api from "./routes/api";
import morgan from "morgan";

dotenv.config();

connectDb().then(() => {
  // Create server
  const server = restify.createServer({
    name: "Syncline API",
    version: "1.0.0",
    ignoreTrailingSlash: true,
  });
  server.use(
    cors({
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",")
        : "*",
      credentials: true,
    })
  );
  server.use(restify.plugins.throttle({ burst: 5, rate: 0.5, ip: true }));
  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.multipartBodyParser());
  server.use(morgan("dev"));

  // Routes
  api.applyRoutes(server, "/api");

  server.listen(process.env.PORT || 8000, () => {
    logger.info(`Server running on port ${process.env.PORT || 8000}`);
  });
});
