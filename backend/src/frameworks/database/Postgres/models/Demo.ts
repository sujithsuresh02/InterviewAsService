import { Sequelize, DataTypes, Model } from "sequelize";
const { v4: uuidv4 } = require("uuid");
export const initDemoDetailsModel = (sequelize: Sequelize) => {
  return sequelize.define("demos", {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    learnAboutUs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ValidationToken: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
