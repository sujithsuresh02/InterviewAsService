"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initInterviewModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const initInterviewModel = (sequelize) => {
    return sequelize.define("interview", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        interviewerId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "interviewers",
                key: "id",
            },
        },
        studentId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            references: {
                model: "studentcvs",
                key: "id",
            },
        },
        SelectedDate: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        selectedTime: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        codingScore: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "null",
            allowNull: false,
        },
        technicalScore: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "null",
            allowNull: false,
        },
        communicationScore: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "null",
            allowNull: false,
        },
        TotalInterviewScore: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "null",
            allowNull: false,
        },
        feedbackStatus: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "null",
            allowNull: false,
        },
        feedbackDescription: {
            type: sequelize_1.DataTypes.STRING(500),
            defaultValue: "null",
            allowNull: false,
        },
        interviewToken: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
        },
        interviewStatus: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "unsheduled",
        },
    });
};
exports.initInterviewModel = initInterviewModel;
