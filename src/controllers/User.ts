import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Logging from "../library/Logging";

/* Finding a user by its id */
const getUser = (request: Request, response: Response, next: NextFunction) => {
  const userId = request.params.userId;

  return User.findById(userId)

    .then((user) =>
      user
        ? response.status(200).json({ user })
        : response.status(404).json({ message: "Usuário não encontrado" }),
    )

    .catch((error) => response.status(500).json({ error }));
};

/* Get all the users */
const getAllUsers = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  return User.find()

    .then((users) => response.status(200).json({ users }))

    .catch((error) => response.status(500).json({ error }));
};

/* Edit a user passing its id */
const editUser = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;

  Logging.warn(
    `Tentativa de edição de usuário com token "${token ? token : "nulo"}".`,
  );

  const userId = request.params.userId;

  return User.findById(userId)

    .then((user: any) => {
      if (user) {
        user.set(request.body);

        return user
          .save()

          .then((user: any) => {
            response.status(201).json({ user });
            Logging.data(`Usuário ${user.name} editado com sucesso.`);
          })

          .catch((error: Error) => {
            response.status(500).json({ error });
            Logging.err(`Tentativa de edição de usuário mau sucedida.`);
          });
      } else {
        return response
          .status(404)
          .json({ message: "Usuário não encontrado." });
      }
    })

    .catch((error) => response.status(500).json({ error }));
};

/* Deleting a user passing its id */
const deleteUser = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization;

  Logging.warn(
    `Tentativa de edição de usuário com token "${token ? token : "nulo"}".`,
  );

  const userId = request.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? response.status(201).json({ user, message: "Usuário deletado." })
        : response.status(404).json({ message: "Usuário não encontrado." }),
    )

    .catch((error) => response.status(500).json({ error }));
};

export default {
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
};
