import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"
import User from "../models/User";
import userService from "../services/userService";
import jwtService from "../services/jwtService";

/* Create a new user */
const register = async (request: Request, response: Response, next: NextFunction) => {
    const { name, email, password, admin } = request.body

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password,
        admin
    })

    return user.save()
        .then((user) => response.status(201).json({ user }))
        .catch((error) => response.status(500).json({ error }))
}

const login = async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body

    try {
        let user = await userService.findByEmail(email)

        
        if(!user) return response.status(404).json({ message: 'E-mail não registrado.' })

        userService.checkPassword(password, user.password, (err, isSame) => {
            if(err) return response.status(400).json({ message: err.message })
            console.log(password, user?.password, isSame)
            if (!isSame) return response.status(401).json({ message: 'Senha incorreta' })

            const payload = {
                id: user?._id,
                name: user?.name,
                email: user?.email
              }
      
              const token = jwtService.signToken(payload, '7d')
      
              return response.json({ authenticated: true, ...payload, token})
        })

            
        } catch (error) {
            if (error instanceof Error) {
                return response.status(400).json({ message: error.message })
            }
        }
        
}

export default {
    register,
    login
}