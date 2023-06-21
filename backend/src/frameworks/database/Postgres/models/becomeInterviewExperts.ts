import { Sequelize, DataTypes, Model, UUIDV4 } from 'sequelize';

export const initInterviewExpertModal = (sequelize: Sequelize) => {
 return  sequelize.define('becominterviewexperts', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentEmployer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    domainExpertise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Token: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
    },
  })
}