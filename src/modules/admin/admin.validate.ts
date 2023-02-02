import { Joi } from "celebrate";

export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(12).required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(12).required(),
});
