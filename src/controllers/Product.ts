import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"
import Product from "../models/Product";

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

const getProduct = (request: Request, response: Response, next: NextFunction) => {
    const productId = request.params.userId

    return Product.findById(productId)
        .then((product) => (product ? response.status(200).json({ product }) : response.status(404).json({ message: 'not found' })))
        .catch((error) => response.status(500).json({ error }));
}

const getAllProducts = (request: Request, response: Response, next: NextFunction) => {
    return Product.find()
        .then((products) => response.status(200).json({ products }))
        .catch((error) => response.status(500).json({ error }));
}

const getByCategory = (request: Request, response: Response, next: NextFunction) => {
    return Product.find({ category: request.params.categoryId })
}

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