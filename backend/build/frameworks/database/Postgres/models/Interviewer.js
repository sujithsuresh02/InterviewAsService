"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTimesModal = exports.initTimeSlotModal = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const initTimeSlotModal = (sequelize) => {
    return sequelize.define("timeslot", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        dayOfWeek: {
            type: sequelize_1.DataTypes.STRING,
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
    });
};
exports.initTimeSlotModal = initTimeSlotModal;
const initTimesModal = (sequelize) => {
    return sequelize.define("Times", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        timeSlot: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "available",
        },
        timeslotId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "timeslots",
                key: "id",
            },
        },
    });
};
exports.initTimesModal = initTimesModal;
