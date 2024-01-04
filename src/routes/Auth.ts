import express from "express";
import controller from "../controllers/Auth";
import { schemas, validateSchema } from "../middlewares/ValidateSchema";

const router = express.Router();

/* Create a new user */
router.post(
  "/register",
  validateSchema(schemas.auth.register),
  controller.register,
);

/* Login */
router.post("/login", validateSchema(schemas.auth.login), controller.login);

export = router;
