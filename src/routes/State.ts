import express from "express";
import controller from "../controllers/State";
import { schemas, validateSchema } from "../middlewares/ValidateSchema";
import Auth from "../middlewares/Auth";

const router = express.Router();

/* Create a new state */
router.post(
  "/create",
  validateSchema(schemas.state.create),
  Auth.ensureAuth,
  controller.createState,
);

/* Find a state by its id */
router.get("/get/:stateId", controller.getState);

/* Get all the states */
router.get("/get", controller.getAllStates);

/* Edit a state passing its id */
router.patch(
  "/update/:stateId",
  validateSchema(schemas.state.update),
  Auth.ensureAuth,
  controller.editState,
);

/* Deleting a state passing its id */
router.delete("/delete/:stateId", Auth.ensureAuth, controller.deleteState);

export = router;
