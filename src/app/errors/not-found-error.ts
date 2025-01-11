import { CustomError } from "./custome-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string = "Resource not found") {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { code: string; message: string; details?: any } {
    return {
      code: "NOT_FOUND",
      message: this.message,
    };
  }
}
