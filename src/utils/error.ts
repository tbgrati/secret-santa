import { NextFunction, Request, Response } from 'express'

abstract class KnownError extends Error {
    message: string;
    code: number;
    protected constructor (code: number, message: string) {
        super(message)
    }
}

export class InvalidRequestError extends KnownError {
    name: string;
    constructor (message: string) {
        super(400, message)
        this.name = "InvalidRequestError"
    }
}

export class NotFoundError extends KnownError {
    name: string;
    constructor (message: string) {
        super(404, message)
        this.name = "NotFoundError"
    }
}

export function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response {
    if(error instanceof KnownError){
        return res.status(error.code).json({
            name: error.name,
            message: error.message,
            code: error.code
        })
    }
    return res.status(500).json({ message: "Internal Server Error" });
}