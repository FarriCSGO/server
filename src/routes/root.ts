import express, { IRouter, Request, Response } from "express";

const router: IRouter = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("<h1> Hello </h1>");
});

export default router;
