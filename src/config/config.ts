import * as env from "env-var";

export const DB_ENGINE: string = env.get("DB_ENGINE").required().asString();

export const DB_SERVER: string = env.get("DB_SERVER").required().asString();

export const DB_USER: string = env.get("DB_USER").required().asString();

export const DB_PASSWORD: string = env.get("DB_PASSWORD").required().asString();

export const DB_CLUSTER: string = env.get("DB_CLUSTER").required().asString();

export const DATABASE: string = env.get("DATABASE").required().asString();

export const PORT: string = env.get("PORT").required().asString();

export const JWT_KEY: string = env.get("JWT_KEY").required().asString();

export const ADMIN_KEY: string = env.get("ADMIN_KEY").required().asString();

export const connectionString: string = `${DB_ENGINE}+${DB_SERVER}://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DATABASE}`

export const config = {
  mongo: {
    url: connectionString
  },

  server: {
    port: PORT
  },
};
