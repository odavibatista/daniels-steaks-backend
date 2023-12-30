import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { config } from './config/config'
import Logging from './library/Logging'

const router = express()

/* Connection to Atlas */
mongoose.connect(config.mongo.url)
.then(() => {
    Logging.info("Connected to MongoDB remotely.")
}).catch((err) => {
    Logging.err("Error while trying to connect to MongoDB remotely.")
})