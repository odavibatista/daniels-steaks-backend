import express from 'express'
import controller from '../controllers/Auth'

const router = express.Router()

/* Create a new user */
router.post("/register", controller.register)

/* Login */
router.post("/login", controller.login)

export = router