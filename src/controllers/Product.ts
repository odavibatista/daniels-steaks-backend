import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Logging from "../library/Logging.js";
import productService from "../services/productService.js";

/* Create a new product */
const createProduct = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization;

  Logging.warn(
    `Tentativa de criação de produto com token "${token ? token : "nulo"}".`,
  );

  const { title, description, price, imgUrl, category, featured } =
    request.body;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    price,
    imgUrl,
    category,
    featured,
  });

  return product
    .save()

    .then((product) => {
      Logging.data(`Novo produto registrado: ${product.title}`);
      response.status(201).json({ product });
    })

    .catch((error) => {
      response.status(500).json({ error });
      Logging.err(`Tentativa de registro de produto mau sucedida.`);
    });
};

/* Finding a product by its id */
const getProduct = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const productId = request.params.userId;

  return Product.findById(productId)

    .then((product) =>
      product
        ? response.status(200).json({ product })
        : response.status(404).json({ message: "Produto não encontrado." }),
    )

    .catch((error) => response.status(500).json({ error }));
};

/* Get all the products */
const getAllProducts = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  return Product.find()

    .then((products) => response.status(200).json({ products }))

    .catch((error) => response.status(500).json({ error }));
};

/* Get all the products by category */
const getByCategory = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  return Product.find({ category: request.params.categoryId });
};

/* Edit a product passing its id */
const editProduct = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization;

  Logging.warn(
    `Tentativa de edição de produto com token ${token ? token : "nulo"}.`,
  );

  const productId = request.params.userId;

  return Product.findById(productId)

    .then((product: any) => {
      if (product) {
        product.set(request.body);

        return product
          .save()

          .then((product: any) => {
            response.status(201).json({ product });
            Logging.data(`Produto de id ${productId} editado com sucesso.`);
          })

          .catch((error: Error) => {
            response.status(500).json({ error });
            Logging.err("Edição de produto mau sucedida.");
          });
      } else {
        return response
          .status(404)
          .json({ message: "Produto não encontrado." });
      }
    })

    .catch((error) => response.status(500).json({ error }));
};

/* Deleting a product passing its id */
const deleteProduct = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const productId = request.params.userId;

  return Product.findByIdAndDelete(productId)

    .then((product) =>
      product
        ? response.status(201).json({ product, message: "Produto deletado." })
        : response.status(404).json({ message: "Produto não encontrado." }),
    )

    .catch((error) => response.status(500).json({ error }));
};

/* Find a product by its name */
const search = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { title } = request.query;

  try {
    if (typeof title !== "string") throw new Error("Name must be a string");

    let products = await productService.findByName(title);
    return response.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }
  }
};

/* Get featured products only */
const getFeatured = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    let products = await productService.findFeatured();
    return response.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }
  }
};

export default {
  createProduct,
  getProduct,
  getAllProducts,
  getByCategory,
  editProduct,
  deleteProduct,
  search,
  getFeatured,
};
