import express from 'express'
import controller from '../controllers/Product'
import { schemas, validateSchema } from '../middleware/ValidateSchema'

const router = express.Router()

/* Create a new product */
router.post("/create", validateSchema(schemas.product.create), controller.createProduct)

/* Finding a product by its id */
router.get("/get/:productId", controller.getProduct)

/* Get all the products */
router.get("/get", controller.getAllProducts)

/* Get all the products in a determined category */
router.get("/getByCategory/:categoryId", controller.getByCategory)

/* Edit a product passing its id */
router.patch("/update/:productId", validateSchema(schemas.product.update), controller.editProduct)

/* Deleting a product passing its id */
router.delete("/delete/:productId", controller.deleteProduct)

export = router