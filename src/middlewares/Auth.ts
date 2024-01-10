import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, request } from "express";
import { ADMIN_KEY, JWT_KEY } from "../config/config";
import User, { IUser, IUserInstance } from "../models/User";
import jwtService from "../services/jwtService";
import userService from "../services/userService";

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
    return response.status(401).json({ message: "Admin token is missing" });
  }

  const token = adminKey.replace(/Bearer /, "");

  if (token !== ADMIN_KEY) {
    return response.status(401).json({ message: "Admin token is invalid" });
  }

  const user: any = userService.findByEmail(request.body.email);

  request.user = user;

  next();
}

export default {
  ensureAuth,
  ensureAdminAuth
};
