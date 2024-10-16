import { NextFunction, Request, Response } from "express";

interface myAppError extends Error {
    statusCode: number,
}

class BackendError extends Error implements myAppError{
    public statusCode: number
    public message: string
    constructor(status: number, message: string) {
        super();
        this.statusCode = status
        this.message = message
    }
}



const ErrorRequestHandler = (err : myAppError, req: Request, res: Response, next: NextFunction)=>{
    const message :string |null =  err.message || "Something went wrong";
    const statusCode : number = err.statusCode || 500;

    res.status(statusCode).json({
        message : message,
        stack : err.stack
    });
}

export {
    BackendError,
    myAppError,
    ErrorRequestHandler
}