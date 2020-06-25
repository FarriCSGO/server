import { Request, Response, NextFunction } from "express";

interface Error {
    code: number;
    message: string;
}

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    console.error("!!ERROR HANDLER TRIGGERED!!");
    console.error("STATUS CODE:", error.code, "ERROR MESSAGE:", error.message);
    res.status(error.code || 500).json({
        message: error.message || "An unknown error occured",
    });
};

export default errorHandler;
