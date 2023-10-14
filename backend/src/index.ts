import "express-async-errors";
import { connect } from "./server";

import cors from "cors";
import express from "express";
import http from "http";
import config from "../config";
import router from "./app/router";
import { errorHandlerMiddleware, logMiddleware } from "./middlewares";

const app = express();

const start = async () => {
  await connect();

  app.use(express.json(), cors());

  app.use(logMiddleware);

  app.use("/api", router);

  app.use(errorHandlerMiddleware);

  const httpServer = http.createServer(app);

  httpServer.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
  });
};

start().catch(() => process.exit(1));
