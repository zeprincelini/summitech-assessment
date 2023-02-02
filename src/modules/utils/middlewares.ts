import { Request, Response, NextFunction } from "express";
import { customError, jwtVerify } from ".";
import AdminService from "../admin/admin.service";
import { AuthRequest, IAdmin, IError } from "../../types";

export const isAuthenticated = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw customError("Authorization header not found!", 404);
  }

  const bearer = req.headers.authorization?.split(" ")[1];
  if (!bearer) {
    throw customError("Token not found!", 404);
  }
  const verified = jwtVerify(bearer);
  if (!verified) {
    throw customError("Invalid token!", 403);
  }
  const token = verified as IAdmin;

  delete token.password;

  req.admin = token;

  next();
};

export const handleError = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  return res.status(err?.code || 500).json({
    status: false,
    message: err?.message,
  });
};

export const isAdmin = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const {
      admin: { id },
    } = req;

    const isAdmin = await new AdminService(id).findOne().catch((e) => {
      throw e;
    });

    if (!isAdmin) {
      throw customError("You are not an admin", 500);
    }

    next();
  } catch (error) {
    return next(error);
  }
};
