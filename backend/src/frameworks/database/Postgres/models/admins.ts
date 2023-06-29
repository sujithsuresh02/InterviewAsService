import { Sequelize, DataTypes, Model } from 'sequelize';
const { v4: uuidv4 } = require("uuid");

export const initAdminModel = (sequelize: Sequelize) => {
  return sequelize.define('admins', {

    id: {
      type: DataTypes.UUID,
      defaultValue:uuidv4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

};

export const initSubscriptionPlans = (sequelize: Sequelize) => {
  return sequelize.define('plans', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    features: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    validity: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  });

};


