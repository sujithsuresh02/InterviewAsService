import { Sequelize, DataTypes, Model } from "sequelize";
import { UUIDV4 } from "sequelize";
export const initInterviewModel = (sequelize: Sequelize) => {
  return sequelize.define("interview", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    interviewerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "interviewers",
        key: "id",
      },
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "studentcvs",
        key: "id",
      },
    },
    SelectedDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codingScore: {
      type: DataTypes.STRING,
      defaultValue: "null",
      allowNull: false,
    },
    technicalScore: {
      type: DataTypes.STRING,
      defaultValue: "null",
      allowNull: false,
    },
    communicationScore: {
      type: DataTypes.STRING,
      defaultValue: "null",
      allowNull: false,
    },
    TotalInterviewScore: {
      type: DataTypes.STRING,
      defaultValue: "null",
      allowNull: false,
    },
    feedbackStatus: {
      type: DataTypes.STRING,
      defaultValue: "null",
      allowNull: false,
    },
    feedbackDescription: {
      type: DataTypes.STRING,
      defaultValue: "null",
      allowNull: false,
    },

    interviewToken: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    interviewStatus: {
      type: DataTypes.STRING,
      defaultValue: "unsheduled",
    },
  });
};
