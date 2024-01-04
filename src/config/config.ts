import * as env from "env-var"

export const DB_URL: string = env.get("DB_URL").required().asString()

export const PORT: string = env.get("PORT").required().asString()

export const JWT_KEY: string = env.get("JWT_KEY").required().asString()

export const config = {
    mongo: {
        url: DB_URL
    },

    server: {
        port: PORT
    }
}