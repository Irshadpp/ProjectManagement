import express, { Router } from "express";
import { taskRouter } from "./task.routes";
import { requireAuth } from "../middlewares/require-auth";
import { createProjectValidator } from "../validators/create-project.validator";
import { validateRequest } from "../middlewares/validate-request";
import {
  createProject,
  editProject,
  fetchAllProjects,
} from "../controllers/project.controller";
import { editProjectValidator } from "../validators/edit-project.validator";
import { authorizeProjectOwner } from "../middlewares/authorize-project-owner";

const router: Router = express.Router();

router.get("/", requireAuth, fetchAllProjects);
router.post(
  "/",
  requireAuth,
  createProjectValidator,
  validateRequest,
  createProject
);
router.patch(
  "/:projectId",
  requireAuth,
  authorizeProjectOwner,
  editProjectValidator,
  validateRequest,
  editProject
);
router.get("/:projectId");
router.delete("/:projectId");
router.post("/:projectId/assign-user");

//Nesting taskRouter under projectRouter for tasks related to a specific project
router.use("/:projectId/task", taskRouter);

export { router as projectRouter };
