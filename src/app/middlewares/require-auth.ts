import { NextFunction, Request, Response } from "express"
import { JWTUserPayload, verifyJwt } from "../utils/jwt";
import { CustomError, ForbiddenError, NotAuthorizedError } from "../errors";

declare module 'express-serve-static-core' {
    interface Request {
      user?: JWTUserPayload;
    }
  }

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const token = req.cookies.accessToken;
        const secret = process.env.JWT_ACCESS_SECRET as string;

        if (!secret) {
            return next(new Error("Can't access JWT_ACCESS_SECRET in requireAuth"));
        }

        if (!token) {
            return next(new NotAuthorizedError());
        }

        try {
            const user = verifyJwt(token, secret);

            if (!user) {
                //if token expire
                return next(new NotAuthorizedError());
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof CustomError) {
                return next(error);
            }
            return next(new ForbiddenError());
        }
    } catch (error) {
        next(error)
    }
    }