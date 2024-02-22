import express from "express";
import controller from "../controllers/Subscription.js";
import { schemas, validateSchema } from "../middlewares/ValidateSchema.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

/* Create a new subscription */
router.post(
  "/create",
  validateSchema(schemas.subscription.create),
  controller.create,
);

/* Get all the subscriptions */
router.get("/get",
Auth.ensureAdminAuth,
controller.findAll);

/* Deleting a subscription passing its id */
router.delete("/delete/:id", 
Auth.ensureAuth,
controller.remove);

export default router