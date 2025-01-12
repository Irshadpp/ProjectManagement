import { CustomError } from "./custome-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; details?: any } {
    return {
      message: this.message,
    };
  }
}
