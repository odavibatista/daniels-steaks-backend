import express from 'express'
import controller from '../controllers/Category'
import { schemas, validateSchema } from '../middlewares/ValidateSchema'
import Auth from '../middlewares/Auth'

const router = express.Router()

/* Create a new category */
router.post("/create", validateSchema(schemas.category.create), Auth.ensureAuth, controller.createCategory)

/* Finding a category by its id */
router.get("/get/:categoryId", controller.getCategory)

/* Get all the categories */
router.get("/get", controller.getAllCategories)

/* Edit a category passing its id */
router.patch("/update/:categoryId", validateSchema(schemas.category.update), Auth.ensureAuth, controller.editCategory)

/* Deleting a category passing its id */
router.delete("/delete/:categoryId", Auth.ensureAuth, controller.deleteCategory)

export = router