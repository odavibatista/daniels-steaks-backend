import express from "express";
import controller from "../controllers/User.js";
import { schemas, validateSchema } from "../middlewares/ValidateSchema.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

/* Find a user by its id */
router.get("/get/:userId", Auth.ensureAdminAuth, controller.getUser);

/* Get all the users */
router.get("/get", Auth.ensureAdminAuth, controller.getAllUsers);

/* Edit a user passing its id */
router.patch(
  "/update/:userId",
  validateSchema(schemas.user.update),
  Auth.ensureAdminAuth,
  controller.editUser,
);

/* Deleting a user passing its id */
router.delete("/delete/:userId", Auth.ensureAdminAuth, controller.deleteUser);

export default router