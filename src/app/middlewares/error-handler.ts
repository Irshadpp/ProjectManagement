import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.serializeErrors());
        return;
    }

    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong."
        }
    });
};

export { errorHandler };
