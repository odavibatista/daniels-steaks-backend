import { NextFunction, Request, Response, request } from "express";
import mongoose from "mongoose"
import User from "../models/User";

const createUser = (request: Request, response: Response, next: NextFunction) => {
    const { name, email, password, admin } = request.body

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password,
        admin
    })

    return user
        .save()
        .then((user) => response.status(201).json(user))
        .catch((error) => {
            response.status(500).json({
                error: error
            })
    })
}

const getUser = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId

    return User.findById(userId)
        .then(user => user ? response.status(200).json(user) : response.status(404).json({ message: "User not found" }))
}

const getAllUsers = (request: Request, response: Response, next: NextFunction) => {
    return User.find()
        .then(users => response.status(200).json(users))
        .catch(error => response.status(500).json({ error: error }))
}

const editUser = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId

    return User.findById(userId)
        .then(user => user ? 
            response.status(200).json(user) : 
            response.status(404).json({ message: "User not found" }))
}

const deleteUser = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId

    return User.findByIdAndDelete(userId)
    .then((user) => (user ? response.status(201).json({message: "User deleted"}) : 
    response.status(404).json({ message: "User not found" })))
}

export default { createUser, getUser, getAllUsers, editUser, deleteUser }