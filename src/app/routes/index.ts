import express from "express"
import { userRouter } from "./user.routes";
import { projectRouter } from "./project.routes";

const router = express.Router();

router.use("/user",userRouter);
router.use("/project",projectRouter);

export {router as appRouter}