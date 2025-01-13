import express, { json } from "express";
import { appRouter } from "./app/routes";
import { errorHandler } from "./app/middlewares/error-handler";
import { NotFoundError } from "./app/errors";
import cookieParser from "cookie-parser"
import morgan from "morgan"
import rateLimit from "express-rate-limit";

const app = express();

app.use(json());
app.use(cookieParser());
app.use(morgan("combined"));

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
  message: "Too many requests from this IP, please try again later.",
});

// Applying the rate limiter to all requests
app.use(limiter);

app.use("/api/v1", appRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
