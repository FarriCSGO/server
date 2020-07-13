import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): any => {
  res.send("<h1>Home Route of Farri Server</h1>");
};
