import express, { Router } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { createTaskValidator } from "../validators/create-task.validation";
import { validateRequest } from "../middlewares/validate-request";
import { createTask, deleteTask, editTask, fetchTask, fetchTasksByProject } from "../controllers/task.controller";
import { editTaskValidator } from "../validators/edit-task.validation";

//merging params from project endpoints
const router: Router = express.Router({ mergeParams: true });

router.get("/", requireAuth, fetchTasksByProject);
router.post("/", requireAuth, createTaskValidator, validateRequest, createTask);
router.get("/:taskId", requireAuth, fetchTask);
router.patch("/:taskId", requireAuth, editTaskValidator, validateRequest, editTask);
router.delete("/:taskId", requireAuth, deleteTask)

export { router as taskRouter };
