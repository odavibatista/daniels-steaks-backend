import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

export const config = {
    mongo: {
        url: DB_URL || ""
    },
    server: {
        port: PORT || 3000
    }
}