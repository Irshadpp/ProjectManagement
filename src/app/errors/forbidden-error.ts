import { CustomError } from "./custome-error";

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(public message: string = "Access forbidden") {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors(): { code: string; message: string; details?: any } {
    return {
      code: "FORBIDDEN",
      message: this.message,
    };
  }
}
