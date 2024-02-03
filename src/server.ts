import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import usersRouter from "./routes/User";
import categoriesRouter from "./routes/Category";
import productsRouter from "./routes/Product";
import authRouter from "./routes/Auth";
import storesRouter from "./routes/Store";
import subscriptionRouter from "./routes/Subscription";

const router = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.err(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
  /** Log the request */
  router.use((req, res, next) => {
    /** Log the req */
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
    );

    res.on("finish", () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`,
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET",
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  router.use("/users", usersRouter);

  router.use("/categories", categoriesRouter);

  router.use("/products", productsRouter);

  router.use("/auth", authRouter);

  router.use("/stores", storesRouter);

  router.use("/subs", subscriptionRouter);

  /** Healthcheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ hello: "world" }),
  );

  router.get("/check", (req, res, next) =>  {
    try {
      return res.status(200).json({ message: "OK!" });
    } catch (error) {
      return res.status(500).json({ message: "NOT OK!" });
    }
  })

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("Not found");

    Logging.err(error);

    res.status(404).json({
      message: error.message,
    });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`),
    );
};
