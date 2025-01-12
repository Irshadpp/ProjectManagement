import { body } from "express-validator";

export const editTaskValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task name must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("Task status is required")
    .isIn(["To Do", "In Progress", "Done"])
    .withMessage(
      "Task status must be one of the following: 'To Do', 'In Progress', 'Done'"
    ),
];
