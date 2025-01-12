import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { BadRequestError } from "../errors";
import Password from "../utils/password";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    console.log(existingUser)
    if (existingUser) {
      throw new BadRequestError("User already exists in this email!");
    }
    const {password} = req.body;
    const hashedPassword = await Password.toHash(password);
    const newUser = await userService.createUser({email, password: hashedPassword});
    res.status(200).json({id: newUser.id, email: newUser.email});
  } catch (error) {
    console.log(error)
    next(error);
  }
};

