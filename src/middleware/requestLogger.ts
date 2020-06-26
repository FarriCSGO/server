import { Request, Response, NextFunction } from 'express';

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // startTime - time at which the request reach the server
  const startTime = new Date().getTime();

  // Log details to console when the response is sent from the server to client
  res.on('finish', () => {
    //endTime - time it took for the server to process the request
    const endTime = new Date().getTime() - startTime;

    // Print request details to the console
    console.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${endTime}ms`
    );
  });
  // Go to the next middleware and not block the entire server
  next();
};

export default requestLogger;
