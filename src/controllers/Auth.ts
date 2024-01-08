import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import userService from "../services/userService";
import jwtService from "../services/jwtService";
import Logging from "../library/Logging";

/* Create a new user */
const register = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  Logging.warn(
    `Tentativa de registro de usuário com o e-mail ${request.body.email}`,
  );

  const { name, email, password, admin = false } = request.body;

  const userExists = await userService.findByEmail(email);

  if (userExists) {
    Logging.warn(`Tentativa de registro mau-sucedida: e-mail já registrado!`);
    return response.status(400).json({ message: "E-mail já registrado." });
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    admin: false,
  });

  return user
    .save()

    .then((user) => {
      response.status(201).json({ user });
      Logging.data(
        `Novo usuário ${
          admin === true ? "administrador" : "padrão"
        } registrado: ${user.name} (${user.email})`,
      );
    })

    .catch((error) => {
      response.status(500).json({ error });
      Logging.err(`Tentativa de registro de usuário mau sucedida.`);
    });
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { email, password } = request.body;

  try {
    Logging.data(`Tentativa de login com o e-mail ${email}`);

    let user = await userService.findByEmail(email);

    if (!user)
      return response.status(404).json({ message: "E-mail não registrado." });

    userService.checkPassword(password, user.password, (err, isSame) => {
      if (err) {
        Logging.err(err.message);
        return response.status(400).json({ message: err.message });
      }

      if (!isSame) {
        Logging.err(`Tentativa de login mau sucedida com o e-mail ${email}`);
        return response.status(401).json({ message: "Senha incorreta" });
      }

      const payload = {
        id: user?._id,
        name: user?.name,
        email: user?.email,
      };

      const token = jwtService.signToken(payload, "7d");

      Logging.data(
        `O usuário ${user.name} (${user?.email}) fez login com sucesso no sistema.`,
      );
      return response.json({ authenticated: true, ...payload, token });
    });
  } catch (error) {
    if (error instanceof Error) {
      Logging.err(error.message);
      return response.status(400).json({ message: error.message });
    }
  }
};

export default {
  register,
  login,
};
