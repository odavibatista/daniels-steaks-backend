import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"
import Product from "../models/Product";

/* Create a new product */
const createProduct = (request: Request, response: Response, next: NextFunction) => {
    const { title, description, price, imgUrl, category, featured } = request.body

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        price,
        imgUrl,
        category,
        featured
    })

    return product.save()
        .then((product) => response.status(201).json({ product }))
        .catch((error) => response.status(500).json({ error }))
}

/* Finding a product by its id */
const getProduct = (request: Request, response: Response, next: NextFunction) => {
    const productId = request.params.userId

    return Product.findById(productId)
        .then((product) => (product ? response.status(200).json({ product }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

/* Get all the products */
const getAllProducts = (request: Request, response: Response, next: NextFunction) => {
    return Product.find()
        .then((products) => response.status(200).json({ products }))
        .catch((error) => response.status(500).json({ error }));
}

/* Get all the products by category */
const getByCategory = (request: Request, response: Response, next: NextFunction) => {
    return Product.find({ category: request.params.categoryId })
}

/* Edit a product passing its id */
const editProduct = (request: Request, response: Response, next: NextFunction) => {
    const productId = request.params.userId

    return Product.findById(productId)
    .then((product) => {
        if (product) {
            product.set(request.body);

            return product
                .save()
                .then((product) => response.status(201).json({ product }))
                .catch((error) => response.status(500).json({ error }));
        } else {
            return response.status(404).json({ message: 'not found' });
        }
    })
    .catch((error) => response.status(500).json({ error }));
}

/* Deleting a product passing its id */
const deleteProduct = (request: Request, response: Response, next: NextFunction) => {
    const productId = request.params.userId

    return Product.findByIdAndDelete(productId)
        .then((product) => (product ? response.status(201).json({ product, message: 'Deleted' }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

export default { 
    createProduct, 
    getProduct, 
    getAllProducts, 
    getByCategory, 
    editProduct, 
    deleteProduct
}