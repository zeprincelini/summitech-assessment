import { Router } from "express";
import { celebrate } from "celebrate";
import { signIn, signUp } from "./admin.controller";
import { signUpSchema, signInSchema } from "./admin.validate";

const router = Router();

router.post("/sign-up", celebrate({ body: signUpSchema }), signUp);
router.post("/sign-in", celebrate({ body: signInSchema }), signIn);

export default router;
