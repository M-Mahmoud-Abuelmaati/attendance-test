import 'dotenv/config'

export default {
  PORT: process.env.PORT!,
  MONGO_URI: process.env.MONGO_URI!,
  DB_NAME: process.env.MONGO_DB_NAME!,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!
};
