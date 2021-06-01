import { Request, Response, NextFunction } from "express";

export function get(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "Hello express" });
}