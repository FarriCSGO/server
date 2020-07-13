import { Request, Response, NextFunction } from "express";
import { IError } from "../interfaces";

const errorHandler = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occured"
  });
};

export default errorHandler;
