import express from 'express'
import controller from '../controllers/User'

const router = express.Router()

/* Create a new user */
router.post("/create", controller.createUser)

/* Find a user by its id */
router.get("/get/:userId", controller.getUser)

/* Get all the users */
router.get("/get", controller.getAllUsers)

/* Edit a user passing its id */
router.patch("/update/:userId", controller.editUser)
  
/* Deleting a user passing its id */
router.delete("/delete/:userId", controller.deleteUser)

export = router