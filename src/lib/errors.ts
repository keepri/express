import { type NextFunction, type Request, type Response } from "express";

type AppError = Error;

export function errorHandler(error: AppError, _: Request, res: Response, _next: NextFunction) {
    console.error(error);
    return res.status(500).send(error.message);
}
