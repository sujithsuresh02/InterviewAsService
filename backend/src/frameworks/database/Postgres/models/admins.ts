import { Sequelize, DataTypes, Model } from 'sequelize';

export const initAdminModel = (sequelize: Sequelize) => {
  return sequelize.define('admins', {

    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
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

