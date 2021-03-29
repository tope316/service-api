"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const dotenv = __importStar(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv.config();
exports.connection = new sequelize_1.Sequelize({
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
});
//# sourceMappingURL=Connection.js.map