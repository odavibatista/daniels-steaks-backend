const express = require('express')
const controller = require('../controllers/User')

const router = express.Router()

router.post("/create", controller.createUser)
router.get("/get/:userId", controller.getUser)
router.get("/get/", controller.getAllUsers)
router.patch("/update/:userId", controller.editUser)
router.delete("/delete/:userId", controller.deleteUser)

export = router