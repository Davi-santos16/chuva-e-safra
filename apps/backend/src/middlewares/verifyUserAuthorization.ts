import { NextFunction, Request, Response } from "express";

import type { UserRole } from "../../prisma/generated/prisma/enums";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(roles: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Não autorizado", 401);
    }

    if (!roles.includes(request.user.role)) {
      throw new AppError("Não autorizado", 403);
    }

    return next();
  };
}

export { verifyUserAuthorization };
