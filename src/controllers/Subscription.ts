import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../library/Logging";
import SubscriptionService from "../services/subscriptionService";

const create = async (req: Request, res: Response, next: NextFunction) => {

    const subscription = await SubscriptionService.create(req.body);

    if (subscription) {
        Logging.data(`Inscrição criada com sucesso para o email: ${req.body.email}`)
        res.status(201).json(subscription);
    } else {
        Logging.err(`Erro ao criar inscrição para o email: ${req.body.email}`)
        res.status(500).json({ message: "Erro ao criar inscrição" });
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {

    const subscriptions = await SubscriptionService.findAll();

    if (subscriptions) {
        Logging.data(`Inscrições encontradas com sucesso`)
        res.status(200).json(subscriptions);
    } else {
        Logging.err(`Erro ao buscar inscrições`)
        res.status(500).json({ message: "Erro ao buscar inscrições" });
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {

    const subscription = await SubscriptionService.remove(req.params.id);

    if (subscription) {
        Logging.data(`Inscrição deletada com sucesso`)
        res.status(200).json(subscription);
    } else {
        Logging.err(`Erro ao deletar inscrição`)
        res.status(500).json({ message: "Erro ao deletar inscrição" });
    }
}

export default {
    create,
    findAll,
    remove,
}