import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWT_KEY } from '../config/config'
import User, { IUserInstance } from '../models/User'
import { jwtService } from '../services/jwtService'

export interface AuthenticatedRequest extends Request {
    user?: IUserInstance | null
}

export function ensureAuth (request: AuthenticatedRequest, response: Response, next: NextFunction)  {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        return response.status(401).json({ message: 'Token is missing' })
    }

    const token = authHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, async (error, decoded)    =>  {
        if (error || typeof decoded === 'undefined') return response.status(401).json({ message: 'Unauthorized: token is invalid' })

    })
}