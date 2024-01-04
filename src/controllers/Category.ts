import { NextFunction, Request, Response, request } from "express";
import mongoose from "mongoose"
import Category, { ICategory } from "../models/Category";
import Logging from "../library/Logging";

/* Create a new category */
const createCategory = (request: Request, response: Response, next: NextFunction) =>    {
    const { name, description } = request.body

    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name,
        description
    })

    return category.save()

        .then((category) => {
            response.status(201).json({ category })
            Logging.data(`Nova categoria registrada: ${category.name}`)
        })

        .catch((error) => {
            response.status(500).json({ error })
            Logging.err(`Tentativa de criação de categoria mau sucedida.`)
        })
}

/* Finding a category by its id */
const getCategory = (request: Request, response: Response, next: NextFunction) => {
    const categoryId = request.params.categoryId

    return Category.findById(categoryId)

        .then((category) => (category ? response.status(200).json({ category }) : response.status(404).json({ message: 'not found' })))

        .catch((error) => {
            response.status(500).json({ error })
            Logging.err(`Tentativa de busca de categoria mau sucedida.`)
        });
}

/* Get all the categories */
const getAllCategories = (request: Request, response: Response, next: NextFunction) => {
    return Category.find()

        .then((categories) => {
            response.status(200).json({ categories })
            Logging.data("Busca de categorias retornada com sucesso.")
        })

        .catch((error) => {
            response.status(500).json({ error })
            Logging.err("Erro ao retornar categorias.")
        });
}

/* Edit a category passing its id */
const editCategory = (request: Request, response: Response, next: NextFunction) => {
    const categoryId = request.params.categoryId

    return Category.findById(categoryId)

    .then((category: any) => {
        if (category) {
            category.set(request.body);

            return category
                .save()

                .then((category: any) => {
                    response.status(201).json({ category })
                    Logging.data(`Categoria ${category.name} atualizada com sucesso.`)
                })

                .catch((error: Error) => {
                    response.status(500).json({ error })
                    Logging.err(`Tentativa de atualização de categoria mau sucedida.`)
                });
        } else {
            Logging.err(`Tentativa de atualização de categoria mau sucedida. Motivo: Categoria não encontrada.`)
            return response.status(404).json({ message: 'not found' });
        }
    })

    .catch((error) => {
        Logging.err(`Tentativa de atualização de categoria mau sucedida.`)
        response.status(500).json({ error })
    });
}

/* Deleting a category passing its id */
const deleteCategory = (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.categoryId

    return Category.findByIdAndDelete(userId)

        .then((category: any) => {
            if (category)   {
                response.status(201).json({ category, message: 'Deleted' })
                Logging.data(`Categoria ${category.name} deletada com sucesso.`)
            }   else    {
                response.status(404).json({ message: 'not found' })
                Logging.err(`Tentativa de deleção de categoria mau sucedida. Motivo: Categoria não encontrada.`)
            }
        })

        .catch((error) => {
            response.status(500).json({ error })
            Logging.err(`Tentativa de deleção de categoria mau sucedida.`)
        });
}

export default { 
    createCategory, 
    getCategory, 
    getAllCategories, 
    editCategory, 
    deleteCategory 
}