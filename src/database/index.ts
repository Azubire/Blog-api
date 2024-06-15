import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL!);

    logger.info(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error}`);
  }
};

process.on("SIGINT", () => {
  mongoose.connection.close().finally(() => {
    logger.info("MongoDB Disconnected", {
      service: "Database",
    });
    process.exit(0);
  });
});

export default connectDb;
