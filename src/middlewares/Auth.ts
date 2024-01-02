import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWT_KEY } from '../config/config'
import User, { IUserInstance } from '../models/User'

export interface AuthenticatedRequest extends Request {
    user?: IUserInstance | null
}