export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // this should implement all classes
    abstract serializeErrors(): {
        code: string;
        message: string;
        details?: any;
    };
}
