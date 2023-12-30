import express, { NextFunction, Request, Response, request } from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { config } from './config/config'
import Logging from './library/Logging'
import userRoutes from './routes/User'

const router = express()

/* Connection to Atlas */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        Logging.info("Connected to MongoDB remotely.")  
        startServer()
    })
    .catch((err) => {
        Logging.err("Error while trying to connect to MongoDB remotely.")
})

const startServer = () => {
    router.use((request: Request, response: Response, next: NextFunction) => {

        /* Log the request */
        Logging.info(`Incoming => Method: [${request.method}] | URL:[${request.url}] | IP: [${request.socket.remoteAddress}]`)

        response.on("finish", () => {
            /* Log the response */
            Logging.info(`Outgoing => Method: [${request.method}] | URL:[${request.url}] | IP: [${request.socket.remoteAddress}] | Status: [${response.statusCode}]`)
        })

        next()
    })

    router.use(express.urlencoded({ extended: true }))
    router.use(express.json())

    /* Rules of the API */
    router.use((request: Request, response: Response, next: NextFunction) => {
        response.header("Access-Control-Allow-Origin", "*")
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        
        if (request.method == "OPTIONS") {
            response.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
            return response.status(200).json({})
        }

        next()
    })

    /* Routes */
    router.use("/users", userRoutes)

    /* Health Check */
    router.get("/ping", (request: Request, response: Response) => {
        response.status(200).json({
            message: "pong"
        })
    })

    /* Error handling */
    router.use((request: Request, response: Response, next: NextFunction) => {
        const error = new Error("Not found")

        return response.status(404).json({
            message: error.message
        })
    })

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server running on port ${config.server.port}`)
    })
}