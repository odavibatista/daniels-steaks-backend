import { NextFunction, Request, Response, request } from "express";
import mongoose from "mongoose";
import Store from "../models/Store";
import Logging from "../library/Logging";

/* Create a new store */
const createStore = (request: Request, response: Response, next: NextFunction) => {

    const token = request.headers.authorization

    Logging.warn(
        `Tentativa de criação de loja com token "${token ? token : "nulo"}".`,
      );

    const { name, address, phone, city, state } = request.body;

    const store = new Store({
        _id: new mongoose.Types.ObjectId(),
        name,
        address,
        phone,
        city,
        state
    })

    return store
        .save()

        .then((store) => {
            response.status(201).json({ store });
            Logging.data(`Nova loja registrada: ${store.name}`);
        })

        .catch((error) => {
            response.status(500).json({ error });
            Logging.err(`Tentativa de registro de loja mau sucedida.`);
        });
}

/* Finding a store by its id */
const getStore = (request: Request, response: Response, next: NextFunction) => {
    const storeId = request.params.storeId;

    return Store.findById(storeId)

        .then((store) =>
            store
                ? response.status(200).json({ store })
                : response.status(404).json({ message: "Loja não encontrada." }),
        )
        .catch((error) => {
            response.status(500).json({ error });
            Logging.err(`Tentativa de registro de loja mau sucedida.`);
        });
}

/* Get all the stores */
const getAllStores = (request: Request, response: Response, next: NextFunction) =>  {
    return Store.find()

    .then((stores) => response.status(200).json({ stores }))

    .catch((error) => response.status(500).json({ error }));
}

/* Get all the stores by state */
const getStoreByState = (request: Request, response: Response, next: NextFunction) =>   {
    return Store.find({ state: request.params.stateId })
}

/* Edit a store by passing its id */
const editStore = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    Logging.warn(
        `Tentativa de edição de loja com token ${token ? token : "nulo"}.`,
      );

    const storeId = request.params.storeId;
    
    return Store.findById(storeId)

    .then((store: any) =>    {
        if (store)  {
            store.set(request.body)

            return store.save()
            .then((store: any) =>   {
                response.status(201).json({ store })
                Logging.data(`Loja de id ${storeId} editada com sucesso.`)
            })

            .catch((error: Error) =>    {
                response.status(500).json({ error })
                Logging.err("Edição de loja mau sucedida.")
            })
        } else  {
            return response.status(404).json({ message: "Loja não encontrada." });
        }
    })

    .catch((error) => response.status(500).json({ error }))
}

/* Deleting a story passing its id */
const deleteStore = (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
  const token = request.headers.authorization;

    Logging.warn(
        `Tentativa de edição de loja com token ${token ? token : "nulo"}.`,
      );

    const storeId = request.params.userId;
  
    return Store.findByIdAndDelete(storeId)
  
      .then((store) =>
      store
          ? response.status(201).json({ store, message: "Loja deletada." })
          : response.status(404).json({ message: "Loja não encontrada." }),
      )
  
      .catch((error) => {
        response.status(500).json({ error })
        Logging.err("Edição de loja mau sucedida.")
      })
}

export default  {
    createStore,
    getStore,
    getAllStores,
    getStoreByState,
    editStore,
    deleteStore
}