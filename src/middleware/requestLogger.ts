import { Request, Response, NextFunction } from "express";

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // startTime - time at which the request reach the server
  const startTime = new Date().getTime();

  res.on("finish", () => {
    //endTime - time it took for the server to process the request
    const endTime = new Date().getTime() - startTime;

    console.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${endTime}ms`
    );
  });
  next();
};

export default requestLogger;
