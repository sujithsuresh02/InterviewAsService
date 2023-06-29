import { Sequelize, DataTypes, Model } from "sequelize";
import { UUIDV4 } from "sequelize";
export const initTimeSlotModal = (sequelize: Sequelize) => {
  return sequelize.define("timeslot", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interviewerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "interviewers",
        key: "id",
      },
    },
  });
};

export const initTimesModal = (sequelize: Sequelize) => {
  return sequelize.define("Times", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    timeSlot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
    },
    timeslotId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "timeslots",
        key: "id",
      },
    },
  });
};
