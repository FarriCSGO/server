import { Request, Response, NextFunction } from 'express';

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
  res.status(error.code || 500).json({
    message: error.message || 'An unknown error occured'
  });
};

export default errorHandler;
