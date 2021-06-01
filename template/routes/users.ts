import { Request, Response, NextFunction } from "express";

export function get(req: Request, res: Response, next: NextFunction): void {
  res.end("Request to /users");
}