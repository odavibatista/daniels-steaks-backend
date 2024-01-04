import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWT_KEY } from '../config/config'
import User, { IUser, IUserInstance } from '../models/User'
import jwtService from '../services/jwtService'
import userService from '../services/userService'

export interface AuthenticatedRequest extends Request {
    user?: IUserInstance | null
}

const ensureAuth = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        return response.status(401).json({ message: 'Token is missing' })
    }

    const token = authHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, async (error, decoded)    =>  {
        if (error || typeof decoded === 'undefined') return response.status(401).json({ message: 'Unauthorized: token is invalid' })

        const user: any = await userService.findByEmail((decoded as JwtPayload).email);

        request.user = user;

        next();
    })
}

const ensureAuthViaQuery = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    const { token } = request.query
  
    if (!token) return response.status(401).json({
      message: 'Não autorizado: nenhum token foi encontrado.'
    })
  
    if (typeof token !== 'string') return response.status(400).json({
      message: 'O parâmetro token deve ser do tipo string'
    })
  
    jwtService.verifyToken(token, async (err, decoded) => {
      if (err || typeof decoded === 'undefined') return response.status(401).json({
        message: 'Não autorizado: token inválido.'
      })
  
      const user = await userService.findByEmail((decoded as JwtPayload).email)
      request.user = user
      next()
    })
}

export default {
    ensureAuth,
    ensureAuthViaQuery
}