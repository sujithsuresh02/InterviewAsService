"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../../../config"));
// Create a new Sequelize instance
exports.sequelize = new sequelize_1.Sequelize(config_1.default.database, config_1.default.user, config_1.default.password, {
    host: config_1.default.host,
    port: config_1.default.db_port,
    dialect: 'postgres',
});
// Connect to the database
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Connected to PostgreSQL databasee');
        // Perform database operations here
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
};
exports.default = connectDB;
