import express, { Router } from "express";
import { createUser, editUser, loginUser, newToken } from "../controllers/users.controller";
import { createUserValidator } from "../validators/create-user.validator";
import { validateRequest } from "../middlewares/validate-request";
import { loginUserValidator } from "../validators/login-user.validator";
import { editUserValidator } from "../validators/edit-user.validator";
import { requireAuth } from "../middlewares/require-auth";

const router: Router = express.Router();

router.post("/create", createUserValidator, validateRequest, createUser);
router.post("/login", loginUserValidator, validateRequest, loginUser);
router.patch("/:userId",requireAuth, editUserValidator, validateRequest, editUser)
router.get("/new-token", requireAuth, newToken);

export { router as userRouter };
