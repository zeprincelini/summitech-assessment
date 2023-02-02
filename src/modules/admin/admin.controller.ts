import { Response, Request, NextFunction } from "express";
import AdminService from "./admin.service";
import { customError, decrypt, encrypt, jwtSign, result } from "../utils";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { firstName, lastName, email, password },
    } = req;

    const exists = await new AdminService("", email).findOne().catch((e) => {
      throw e;
    });

    if (exists) {
      throw customError("Account already exists", 403);
    }

    const hash = encrypt(password);
    const admin = await new AdminService()
      .create({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hash,
      })
      .catch((e) => {
        throw e;
      });

    return res.status(200).json(result("Sign up successful", admin));
  } catch (error) {
    return next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { email, password },
    } = req;

    const admin = await new AdminService("", email).findOne().catch((e) => {
      throw e;
    });

    if (!admin) {
      throw customError("Email/Password incorrect", 403);
    }

    if (!admin?.is_active) {
      throw customError("You have been deactivated", 403);
    }

    const unhash = decrypt(password, admin?.password);

    if (!unhash) {
      throw customError("Email/Password incorrect", 403);
    }

    await new AdminService(admin?.id)
      .update({ last_login: new Date() })
      .catch((e) => {
        throw e;
      });

    const token = jwtSign(admin, "72h");
    delete admin?.password;

    return res.status(200).json(
      result("Login successful", {
        admin,
        token,
      })
    );
  } catch (error) {
    return next(error);
  }
};
