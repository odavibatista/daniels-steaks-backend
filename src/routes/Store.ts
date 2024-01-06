import express from "express";
import controller from "../controllers/Store";
import { schemas, validateSchema } from "../middlewares/ValidateSchema";
import Auth from "../middlewares/Auth";

const router = express.Router();

/* Create a new store */
router.post(
  "/create",
  validateSchema(schemas.store.create),
  Auth.ensureAuth,
  controller.createStore,
);

/* Find a store by its id */
router.get("/get/:storeId", controller.getStore);

/* Get all the stores */
router.get("/get", controller.getAllStores);

/* Edit a store passing its id */
router.patch(
  "/update/:storeId",
  validateSchema(schemas.store.update),
  Auth.ensureAuth,
  controller.editStore,
);

/* Deleting a store passing its id */
router.delete("/delete/:storeId", Auth.ensureAuth, controller.deleteStore);

export = router