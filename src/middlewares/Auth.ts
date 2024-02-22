import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, request } from "express";
import { ADMIN_KEY, JWT_KEY } from "../config/config.js";
import User, { IUser, IUserInstance } from "../models/User.js";
import jwtService from "../services/jwtService.js";
import userService from "../services/userService.js";
import Logging from "../library/Logging.js";

export interface AuthenticatedRequest extends Request {
  user?: IUserInstance | null;
}

const ensureAuth = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token is missing" });
  }

  const token = authHeader.replace(/Bearer /, "");

  jwtService.verifyToken(token, async (error, decoded) => {
    if (error || typeof decoded === "undefined")
      return response
        .status(401)
        .json({ message: "Unauthorized: token is invalid" });

    const user: any = await userService.findByEmail(
      (decoded as JwtPayload).email,
    );

    request.user = user;

    next();
  });
};

const ensureAdminAuth = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  const adminKey: any = request.headers.authorization

  if (!adminKey) {
    Logging.warn(`Tentativa de acesso à rota de administrador sem token de administrador.`);
    return response.status(401).json({ message: "Admin token is missing" });
  }

  const token = adminKey.replace(/Bearer /, "");

  if (token !== ADMIN_KEY) {
    Logging.warn(`Tentativa de acesso à rota de administrador com token de administrador inválido.`);
    return response.status(401).json({ message: "Admin token is invalid" });
  }

  const user: any = userService.findByEmail(request.body.email);

  request.user = user;

  Logging.data(`Acesso à rota de administrador autorizado.`);
  next();
}

export default {
  ensureAuth,
  ensureAdminAuth
};
