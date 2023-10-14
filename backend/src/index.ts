import { connect } from "./server";

import cors from "cors";
import express from "express";
import http from "http";
import config from "../config";
import router from "./app/router";

const app = express();

const start = async () => {
  await connect();

  app.use(cors());

  app.use("/api", router);

  const httpServer = http.createServer(app);

  httpServer.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
  });
};

start();
