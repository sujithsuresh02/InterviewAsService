"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initStudentDetailsModal = exports.initaddRequestModal = void 0;
const sequelize_1 = require("sequelize");
const initaddRequestModal = (sequelize) => {
    return sequelize.define("addrequests", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        jobRole: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        jobDescription: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        optional: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        numberOfVacancy: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        TotalStudentsCount: {
            type: sequelize_1.DataTypes.INTEGER,
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
exports.initaddRequestModal = initaddRequestModal;
const initStudentDetailsModal = (sequelize) => {
    return sequelize.define("studentcvs", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: sequelize_1.DataTypes.STRING(500),
        email: sequelize_1.DataTypes.STRING(500),
        phone: sequelize_1.DataTypes.STRING(500),
        experience: sequelize_1.DataTypes.STRING(500),
        skills: sequelize_1.DataTypes.STRING(500),
        education: sequelize_1.DataTypes.STRING(500),
        projects: sequelize_1.DataTypes.STRING(500),
        address: sequelize_1.DataTypes.STRING(500),
        sex: sequelize_1.DataTypes.STRING,
        age: sequelize_1.DataTypes.STRING,
        certifications: sequelize_1.DataTypes.STRING(500),
        addRequestId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "addrequests",
                key: "id",
            },
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
exports.initStudentDetailsModal = initStudentDetailsModal;
