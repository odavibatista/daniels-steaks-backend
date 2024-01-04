import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import Logging from "../library/Logging";
import { IUser } from "../models/User";

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
      admin: Joi.boolean().required(),
    }),
  },

  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      admin: Joi.boolean().required(),
    }),

    update: Joi.object<IUser>({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      admin: Joi.boolean(),
    }),
  },

  category: {
    create: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),

    update: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
    }),
  },

  product: {
    create: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      imgUrl: Joi.string().required(),
      category: Joi.string().required(),
      featured: Joi.boolean().required(),
    }),

    update: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      imgUrl: Joi.string(),
      category: Joi.string(),
      featured: Joi.boolean(),
    }),
  },

  state: {
    create: Joi.object({
      name: Joi.string().required(),
    }),

    update: Joi.object({
      name: Joi.string(),
    }),
  },
};
