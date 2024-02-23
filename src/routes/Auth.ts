import express from "express";
import controller from "../controllers/Auth.js";
import { schemas, validateSchema } from "../middlewares/ValidateSchema.js";

const router = express.Router();

/* Create a new user */
router.post(
  "/register",
  validateSchema(schemas.auth.register),
  controller.register,
);

/* Login */
router.post("/login", validateSchema(schemas.auth.login), controller.login);


export default router
