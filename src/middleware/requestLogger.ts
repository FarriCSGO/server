import { Request, Response, NextFunction } from "express";

const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    // Time at which the request reach the server
    const startTime = new Date().getTime();

    // Log details to console when the response is sent from the server
    res.on("finish", () => {
        // How long it took for the server to process the request
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
