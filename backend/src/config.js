import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 4000;

export const JWT_SECRET = process.env.JWT_SECRET;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const FRONTEND_URL = process.env.FRONTEND_URL;

const DB_DATABASE = process.env.DB_DATABASE;

const DB_USER = process.env.DB_USER || "root";

const DB_PASSWORD = process.env.DB_PASSWORD || "";

const DB_HOST = process.env.DB_HOST || "localhost";

const DB_PORT = process.env.DB_PORT || 3306;

export const credentialsDatabase = {
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
};
