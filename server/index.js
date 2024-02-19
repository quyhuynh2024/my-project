import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
const app = express();

// connect to mongodb atlas
import("./helpers/init_mongodb.js");
import("./helpers/init_redis.js");
// routes
import authRouter from "./routes/authRoutes.js";
import { verifyAccessToken } from "./helpers/jwt_helper.js";
//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", verifyAccessToken, async (req, res, next) => {
  res.send("home page");
});

app.use("/api/v1/auth", authRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
