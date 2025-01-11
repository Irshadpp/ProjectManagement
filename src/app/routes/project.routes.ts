import express, { Router } from "express";
import { taskRouter } from "./task.routes";

const router: Router = express.Router();

router.get("/");
router.post("/");
router.patch("/:projectId");
router.delete("/:projectId");
router.get("/:projectId");
router.post("/:projectId/assign-user")

//Nesting taskRouter under projectRouter for tasks related to a specific project
router.use("/:projectId/task", taskRouter);

export {router as projectRouter}