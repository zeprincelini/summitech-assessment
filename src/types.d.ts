import { Request } from "express";

export interface IAdmin {
  id: string;
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  is_active: boolean;
  last_login: string;
}

export interface IError extends Error {
  code: number;
}

export interface AuthRequest extends Request {
  admin: Partial<IAdmin>;
}

export interface IProduct {
  id: string;
  name: string;
  admin_id: string;
  description: string;
}

export interface IStock {
  id: string;
  quantity: number;
  product_id: string;
}
