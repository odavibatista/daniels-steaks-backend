import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"
import State from "../models/State";

const createState = (request: Request, response: Response, next: NextFunction) => {
    const { name } = request.body

    const state = new State({
        _id: new mongoose.Types.ObjectId(),
        name
    })

    return state.save()
        .then((state) => response.status(201).json({ state }))
        .catch((error) => response.status(500).json({ error }))
}

const getState = (request: Request, response: Response, next: NextFunction) => {
    const stateId = request.params.userId

    return State.findById(stateId)
        .then((state) => (state ? response.status(200).json({ state }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

const getAllStates = (request: Request, response: Response, next: NextFunction) => {
    return State.find()
        .then((states) => response.status(200).json({ states }))
        .catch((error) => response.status(500).json({ error }));
}

const editState = (request: Request, response: Response, next: NextFunction) => {
    const stateId = request.params.userId

    return State.findById(stateId)
    .then((state) => {
        if (state) {
            state.set(request.body);

            return state
                .save()
                .then((state) => response.status(201).json({ state }))
                .catch((error) => response.status(500).json({ error }));
        } else {
            return response.status(404).json({ message: 'not found' });
        }
    })
    .catch((error) => response.status(500).json({ error }));
}

const deleteState = (request: Request, response: Response, next: NextFunction) => {
    const stateId = request.params.userId

    return State.findByIdAndDelete(stateId)
        .then((state) => (state ? response.status(201).json({ state, message: 'Deleted' }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

export default {
    createState,
    getState,
    getAllStates,
    editState,
    deleteState
}