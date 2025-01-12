import express, { Router } from "express";
import { createUser } from "../controllers/users.controller";
import { createUserValidator } from "../validators/create-user.validator";
import { validateRequest } from "../middlewares/validate-request";

const router: Router = express.Router();

router.post("/create", createUserValidator, validateRequest, createUser);
// router.post("/login")
// router.patch("/:userId")
// router.delete("/:userId")

export { router as userRouter };
