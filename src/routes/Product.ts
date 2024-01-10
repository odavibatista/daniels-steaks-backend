import express from "express";
import controller from "../controllers/Product";
import { schemas, validateSchema } from "../middlewares/ValidateSchema";
import Auth from "../middlewares/Auth";

const router = express.Router();

/* Create a new product */
router.post(
  "/create",
  validateSchema(schemas.product.create),
  Auth.ensureAdminAuth,
  controller.createProduct,
);

/* Finding a product by its id */
router.get("/get/:productId", controller.getProduct);

/* Get all the products */
router.get("/get", controller.getAllProducts);

/* Get all the products in a determined category */
router.get("/getByCategory/:categoryId", controller.getByCategory);

/* Search products by name */
router.get("/search", controller.search);

/* Get all the featured products */
router.get("/getFeatured", controller.getFeatured);

/* Edit a product passing its id */
router.patch(
  "/update/:productId",
  validateSchema(schemas.product.update),
  Auth.ensureAdminAuth,
  controller.editProduct,
);

/* Deleting a product passing its id */
router.delete("/delete/:productId", Auth.ensureAdminAuth, controller.deleteProduct);

export = router;
