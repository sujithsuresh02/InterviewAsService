"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPaymentmodal = exports.initSubscriptionModal = void 0;
const sequelize_1 = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const initSubscriptionModal = (sequelize) => {
    return sequelize.define("subscriptions", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        companyId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "companies",
                key: "id",
            },
        },
        planId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "plans",
                key: "id",
            },
        },
        totalAmount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        planName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        validity: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        paymentStatus: {
            type: sequelize_1.DataTypes.STRING(20),
            defaultValue: "pending",
        },
        orderId: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        PaymentMode: {
            type: sequelize_1.DataTypes.STRING(20),
            defaultValue: "Paypal",
        },
        numberOfInterviews: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        startDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
            allowNull: false,
        },
        endDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    });
};
exports.initSubscriptionModal = initSubscriptionModal;
const initPaymentmodal = (sequelize) => {
    return sequelize.define("payments", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuidv4,
        },
        subscriptionId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "subscriptions",
                key: "id",
            },
        },
        paymentId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        companyId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "companies",
                key: "id",
            },
        },
    });
};
exports.initPaymentmodal = initPaymentmodal;
