import { NextFunction, Request, Response, request } from "express";
import mongoose from "mongoose"
import Category from "../models/Category";

const createCategory = (request: Request, response: Response, next: NextFunction) =>    {
    const { name, description } = request.body

    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name,
        description
    })

    return category.save()
        .then((category) => response.status(201).json({ category }))
        .catch((error) => response.status(500).json({ error }))
}

const getCategory = (request: Request, response: Response, next: NextFunction) => {
    const categoryId = request.params.categoryId

    return Category.findById(categoryId)
        .then((category) => (category ? response.status(200).json({ category }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

const getAllCategories = (request: Request, response: Response, next: NextFunction) => {
    return Category.find()
        .then((categories) => response.status(200).json({ categories }))
        .catch((error) => response.status(500).json({ error }));
}

const editCategory = (request: Request, response: Response, next: NextFunction) => {
    const categoryId = request.params.categoryId

    return Category.findById(categoryId)
    .then((category) => {
        if (category) {
            category.set(request.body);

            return category
                .save()
                .then((category) => response.status(201).json({ category }))
                .catch((error) => response.status(500).json({ error }));
        } else {
            return response.status(404).json({ message: 'not found' });
        }
    })
    .catch((error) => response.status(500).json({ error }));
}

const deleteCategory = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.categoryId

    return Category.findByIdAndDelete(userId)
        .then((category) => (category ? response.status(201).json({ category, message: 'Deleted' }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

export default { createCategory, getCategory, getAllCategories, editCategory, deleteCategory }