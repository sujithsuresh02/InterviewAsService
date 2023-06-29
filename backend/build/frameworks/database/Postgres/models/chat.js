"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChatModel = exports.initMessageModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const initMessageModel = (sequelize) => {
    return sequelize.define("messages", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
            primaryKey: true,
        },
        senderId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        chatId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "chats",
                key: "id",
            },
        },
        message: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        timestamp: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });
};
exports.initMessageModel = initMessageModel;
const initChatModel = (sequelize) => {
    return sequelize.define("chats", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
            primaryKey: true,
        },
        adminId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "admins",
                key: "id",
            },
        },
        clientId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "companies",
                key: "id",
            },
        },
        timestamp: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });
};
exports.initChatModel = initChatModel;
