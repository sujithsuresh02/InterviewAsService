"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSubscriptionPlans = exports.initAdminModel = void 0;
const sequelize_1 = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const initAdminModel = (sequelize) => {
    return sequelize.define('admins', {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
};
exports.initAdminModel = initAdminModel;
const initSubscriptionPlans = (sequelize) => {
    return sequelize.define('plans', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        planName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        interviews: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        features: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        validity: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
};
exports.initSubscriptionPlans = initSubscriptionPlans;
