import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config/config'

const signToken = (payload: string | object | Buffer, expiration: string) => {
  return jwt.sign(payload, JWT_KEY, {
    expiresIn: expiration
  })
}

const verifyToken = (token: string, callbackfn: jwt.VerifyCallback) => {
  jwt.verify(token, JWT_KEY, callbackfn)
}

export default {
  signToken,
  verifyToken
}