import { Sequelize, DataTypes, Model } from "sequelize";

export const initaddRequestModal = (sequelize: Sequelize) => {
  return sequelize.define("addrequests", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    jobRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optional: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfVacancy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalStudentsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id',
        
      },
    },

  });
};



export const initStudentDetailsModal = (sequelize: Sequelize) => {
  return sequelize.define("studentcvs", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(500),
    email: DataTypes.STRING(500),
    phone: DataTypes.STRING(500),
    experience: DataTypes.STRING(500),
    skills: DataTypes.STRING(500),
    education: DataTypes.STRING(500),
    projects: DataTypes.STRING(500),
    address: DataTypes.STRING(500),
    sex: DataTypes.STRING,
    age: DataTypes.STRING,
    certifications: DataTypes.STRING(500),
    addRequestId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'addrequests',
        key: 'id',
        
      },
    }

  });
};
