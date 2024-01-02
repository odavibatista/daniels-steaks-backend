import express from 'express'
import controller from '../controllers/User'
import { schemas, validateSchema } from '../middlewares/ValidateSchema'

const router = express.Router()

/* Create a new user */
router.post("/create", validateSchema(schemas.user.create), controller.createUser)

/* Find a user by its id */
router.get("/get/:userId", controller.getUser)

/* Get all the users */
router.get("/get", controller.getAllUsers)

/* Edit a user passing its id */
router.patch("/update/:userId", validateSchema(schemas.user.update), controller.editUser)
  
/* Deleting a user passing its id */
router.delete("/delete/:userId", controller.deleteUser)

export = router