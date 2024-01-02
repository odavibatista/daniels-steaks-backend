import * as env from "env-var"

const DB_URL = env.get("DB_URL").required().asString()
const PORT = env.get("PORT").required().asString()
export const JWT_KEY = env.get("JWT_KEY").required().asString()

export const config = {
    mongo: {
        url: DB_URL || ""
    },

    server: {
        port: PORT || 3000
    }
}