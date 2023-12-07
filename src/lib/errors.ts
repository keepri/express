import { type NextFunction, type Request, type Response } from "express";

export type AppError = Error;

export function errorHandler(error: AppError, _req: Request, res: Response, _next: NextFunction) {
    console.error(error.message);
    return res.status(500).send(error.message);
}
