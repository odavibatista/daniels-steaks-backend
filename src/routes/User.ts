import express from 'express'
import controller from '../controllers/User'

const router = express.Router()

router.post("/create", () => controller.createUse)

router.get("/get/:userId", controller.getUser)

router.get("/get", controller.getAllUsers)

router.patch("/update/:userId", controller.editUser)
  
router.delete("/delete/:userId", controller.deleteUser)

export = router