import { Request, Response, NextFunction } from 'express';

interface Error {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  extraInfo?: {};
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
