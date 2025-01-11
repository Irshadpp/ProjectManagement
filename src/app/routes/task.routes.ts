import express, { Router } from "express";

//merging params from project endpoints
const router: Router = express.Router({ mergeParams: true });

router.get("/");
router.post("/");
router.patch("/:taskId");
router.delete("/:taskId")

export { router as taskRouter };
