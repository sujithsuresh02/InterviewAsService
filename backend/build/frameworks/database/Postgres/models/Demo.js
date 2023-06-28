"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDemoDetailsModel = void 0;
const sequelize_1 = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const initDemoDetailsModel = (sequelize) => {
    return sequelize.define("demos", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        fullName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        emailId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        contactNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        learnAboutUs: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ValidationToken: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: uuidv4,
        },
        message: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    });
};
exports.initDemoDetailsModel = initDemoDetailsModel;
