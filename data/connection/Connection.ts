import * as dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config()
export const connection = new Sequelize({
  host: process.env.DB_HOST || "dev.networkgateway.net",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || "sioi",
  dialect: "mysql",
  username: process.env.DB_USERNAME || "sioi",
  password: process.env.DB_PASSWORD || "not4u2know",
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  }
})