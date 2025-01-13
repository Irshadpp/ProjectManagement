import { body } from "express-validator";

export const loginUserValidator =  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .withMessage("Password is required")
    ]
