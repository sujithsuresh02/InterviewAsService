"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initInterviewExpertModal = void 0;
const sequelize_1 = require("sequelize");
const initInterviewExpertModal = (sequelize) => {
    return sequelize.define('becominterviewexperts', {
        fullName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        linkedIn: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        cvFile: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        currentEmployer: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        graduationYear: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        domainExpertise: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        Token: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
};
exports.initInterviewExpertModal = initInterviewExpertModal;
