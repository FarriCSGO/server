import express, { Response, Request, NextFunction, IRouter } from "express";
import quotesData from "../../../data/quotesByPros.json";

const router: IRouter = express.Router();

const sendQuotes = (req: Request, res: Response, next: NextFunction): any => {
  return res.json(quotesData);
};

router.get("/", sendQuotes);

export { sendQuotes };
export default router;
