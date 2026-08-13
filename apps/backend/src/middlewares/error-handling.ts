

import { AppError } from "@/utils/AppError";
import { Response, Request, NextFunction } from "express";
import { z } from 'zod';


export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map(issue => issue.message);

    return response.status(400).json({
      message: errors
    });
  }
  
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: error.message });
}