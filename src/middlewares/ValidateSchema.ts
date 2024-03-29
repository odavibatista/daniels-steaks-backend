import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import Logging from "../library/Logging.js";
import { IUser } from "../models/User.js";
import { ICategory } from "../models/Category.js";
import { IProduct } from "../models/Product.js";
import { IStore } from "../models/Store.js";

export const validateSchema = (schema: ObjectSchema) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(request.body);

      next();
    } catch (error) {
      Logging.err(error);
      return response.status(422).json({ error });
    }
  };
};

export const schemas = {
  auth: {
    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),

    register: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      admin: Joi.boolean().optional().default(false),
    }),
  },

  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      admin: Joi.boolean().optional().default(false),
    }),

    update: Joi.object<IUser>({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      admin: Joi.boolean(),
    }),
  },

  category: {
    create: Joi.object<ICategory>({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),

    update: Joi.object<ICategory>({
      name: Joi.string(),
      description: Joi.string(),
    }),
  },

  product: {
    create: Joi.object<IProduct>({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      imgUrl: Joi.string().required(),
      category: Joi.string().required(),
      featured: Joi.boolean().required(),
    }),

    update: Joi.object<IProduct>({
      title: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      imgUrl: Joi.string(),
      category: Joi.string(),
      featured: Joi.boolean(),
    }),
  },

  store: {
    create: Joi.object<IStore>({
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required().max(2).min(2).uppercase(),
      imgUrl: Joi.string().required(),
    }),

    update: Joi.object<IStore>({
      name: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      imgUrl: Joi.string().required(),
    }),
  },

  subscription: {
    create: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  },
};
