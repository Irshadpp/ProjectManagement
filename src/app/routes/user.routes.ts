import express, { Router } from "express";
import { createUser, loginUser } from "../controllers/users.controller";
import { createUserValidator } from "../validators/create-user.validator";
import { validateRequest } from "../middlewares/validate-request";
import { loginUserValidator } from "../validators/login-user.validator";

const router: Router = express.Router();

router.post("/create", createUserValidator, validateRequest, createUser);
router.post("/login", loginUserValidator, validateRequest, loginUser);
// router.patch("/:userId")
// router.delete("/:userId")

export { router as userRouter };
