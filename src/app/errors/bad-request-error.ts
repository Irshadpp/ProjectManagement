import { CustomError } from "./custome-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { code: string; message: string; details?: any } {
    return {
      code: "BAD_REQUEST",
      message: this.message,
    };
  }
}
