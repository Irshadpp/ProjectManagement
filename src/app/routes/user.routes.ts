import express, { Router } from "express";
import { createUser } from "../controllers/users.controller";

const router: Router = express.Router();

router.post("/create", createUser);
// router.post("/login")
// router.patch("/:userId")
// router.delete("/:userId")

export {router as userRouter}