import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { celebrate } from "celebrate";

const { JWT_SECRET } = process.env;

export const jwtSign = (value: any, expiry: string) => {
  const signed = jwt.sign({ ...value }, JWT_SECRET, { expiresIn: expiry });

  return signed;
};

export const jwtVerify = (value: any) => {
  const data = jwt.verify(value, JWT_SECRET);

  return data;
};

export const encrypt = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const decrypt = (password: string, hash: string) => {
  const isValid = bcrypt.compareSync(password, hash);
  return isValid;
};

export const customError = (msg: string, code: number) => {
  throw { message: msg, code };
};

export const result = (msg: string, data: unknown) => {
  return {
    status: true,
    message: msg,
    data,
  };
};

export const validate = (schema: any) => {
  return celebrate(
    {
      body: schema,
    },
    {
      abortEarly: true,
      messages: {
        "string.required": "{#label cannot be empty}",
      },
    }
  );
};
