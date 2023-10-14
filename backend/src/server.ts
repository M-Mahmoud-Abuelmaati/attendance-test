import mongoose from "mongoose";
import config from "../config";

const connect = async (): Promise<typeof mongoose> =>
  mongoose.connect(config.MONGO_URI!, {
    dbName: config.DB_NAME,
  });

export { connect };
