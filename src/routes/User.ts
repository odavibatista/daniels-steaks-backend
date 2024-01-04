import express from "express";
import controller from "../controllers/User";
import { schemas, validateSchema } from "../middlewares/ValidateSchema";
import Auth from "../middlewares/Auth";

const router = express.Router();

/* Find a user by its id */
router.get("/get/:userId", controller.getUser);

/* Get all the users */
router.get("/get", Auth.ensureAuth, controller.getAllUsers);

/* Edit a user passing its id */
router.patch(
  "/update/:userId",
  validateSchema(schemas.user.update),
  Auth.ensureAuth,
  controller.editUser,
);

/* Deleting a user passing its id */
router.delete("/delete/:userId", Auth.ensureAuth, controller.deleteUser);

export = router;
