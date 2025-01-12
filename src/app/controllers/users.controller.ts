import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { BadRequestError, NotFoundError } from "../errors";
import Password from "../utils/password";
import {
  generateJwtAccessToken,
  generateJwtRefreshToken,
  JWTUserPayload,
} from "../utils/jwt";
import { setCookie } from "../utils/cookie-utils";
import { HttpStatusCode, sendResponse } from "../utils/send-response";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestError("User already exists in this email!");
    }
    const { password } = req.body;
    const hashedPassword = await Password.toHash(password);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
    });
    sendResponse(res, HttpStatusCode.CREATED, "Created user successfully", {
      id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestError("Invalid email or password!");
    }
    const { password } = req.body;
    console.log(password, user.password)
    const matchPassword = await Password.compare(user.password, password);
    if (!matchPassword) {
      throw new BadRequestError("Invalid email or password!");
    }

    const payload: JWTUserPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateJwtAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET!
    );
    const refreshToken = generateJwtRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET!
    );

    setCookie(res, "accessToken", accessToken, { maxAge: 30 * 60 * 1000 });
    setCookie(res, "refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, HttpStatusCode.OK, "Login successfull", payload);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export const editUser =  async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = req.params
    const id = Number(userId);
    if (!id || !Number.isInteger(id)) {
      throw new BadRequestError("Invalid or missing User ID");
    }
    
    const user = await userService.findUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    
    const {email} = req.body;

    const existingUser = await userService.findUserByEmail(email);
    if(existingUser && user.email !== existingUser?.email){
      throw new BadRequestError("Email already exists")
    }

    const updateData: Partial<{ email: string;}> = {};
    if (email) updateData.email = email;

    const updatedUser = await userService.updateUserById(id, updateData);
    sendResponse(res, HttpStatusCode.OK, "Updated user successfully", {id:updatedUser?.id, email: updatedUser?.email})

  } catch (error) {
    next(error);
  }
}