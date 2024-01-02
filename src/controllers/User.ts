import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"
import User from "../models/User";

/* Create a new user */
const createUser = (request: Request, response: Response, next: NextFunction) => {
    const { name, email, password, admin } = request.body

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password,
        admin
    })

    return user.save()
        .then((user) => response.status(201).json({ user }))
        .catch((error) => response.status(500).json({ error }))
}

/* Finding a user by its id */
const getUser = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId

    return User.findById(userId)
        .then((user) => (user ? response.status(200).json({ user }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

/* Get all the users */
const getAllUsers = (request: Request, response: Response, next: NextFunction) => {
    return User.find()
        .then((users) => response.status(200).json({ users }))
        .catch((error) => response.status(500).json({ error }));
}

/* Edit a user passing its id */
const editUser = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId

    return User.findById(userId)
    .then((user) => {
        if (user) {
            user.set(request.body);

            return user
                .save()
                .then((user) => response.status(201).json({ user }))
                .catch((error) => response.status(500).json({ error }));
        } else {
            return response.status(404).json({ message: 'not found' });
        }
    })
    .catch((error) => response.status(500).json({ error }));
}

/* Deleting a user passing its id */
const deleteUser = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? response.status(201).json({ user, message: 'Deleted' }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

export default { 
    createUser, 
    getUser, 
    getAllUsers, 
    editUser, 
    deleteUser 
}