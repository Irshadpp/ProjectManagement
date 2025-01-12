import { body } from "express-validator";

export const editUserValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
];
