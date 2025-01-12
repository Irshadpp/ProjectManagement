import { body } from "express-validator";

export const editProjectValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Project name must be between 3 and 50 characters"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
];
