import express from 'express'
import controller from '../controllers/Category'

const router = express.Router()

router.post("/create", controller.createCategory)

router.get("/get/:categoryId", controller.getCategory)

router.get("/get", controller.getAllCategories)

router.patch("/update/:categoryId", controller.editCategory)

router.delete("/delete/:categoryId", controller.deleteCategory)

export = router