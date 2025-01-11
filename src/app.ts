import express, { json } from "express";
import { appRouter } from "./app/routes";
import { errorHandler } from "./app/middlewares/error-handler";
import { NotFoundError } from "./app/errors";

const app = express();

app.use(json());

app.use("/api/v1", appRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
