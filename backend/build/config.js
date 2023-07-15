"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    database: process.env.database || 'defaultDatabaseName',
    user: process.env.user || 'defaultUser',
    password: process.env.password || '',
    host: process.env.host || 'localhost',
    db_port: parseInt(process.env.db_port || '5432', 10),
    PORT: parseInt(process.env.PORT || "5000", 10),
    JWT_SECRET: process.env.JWT_SECRET,
    OPEN_API_KEY: process.env.OPEN_API_KEY || "",
    EMAIL: process.env.EMAIL || "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "",
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || "",
    cloud_name: process.env.cloud_name || "",
    api_key: process.env.api_key || "",
    api_secret: process.env.api_secret || ""
};
exports.default = configKeys;
