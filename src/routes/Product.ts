import express from 'express'
import controller from '../controllers/Product'

const router = express.Router()

router.post("/create", controller.createProduct)

router.get("/get/:productId", controller.getProduct)

router.get("/get", controller.getAllProducts)

router.get("/getByCategory/:categoryId", controller.getByCategory)

router.patch("/update/:productId", controller.editProduct)

router.delete("/delete/:productId", controller.deleteProduct)

export = router