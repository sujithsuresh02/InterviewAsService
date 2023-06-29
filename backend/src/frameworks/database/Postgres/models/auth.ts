import { Sequelize, DataTypes, Model } from 'sequelize';
import { UUIDV4} from 'sequelize';
export const initCompanyModel = (sequelize: Sequelize) => {
  return sequelize.define('companies', {

    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    ValidationToken: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
  });

};


 
  export const initStudentModel = (sequelize: Sequelize) => {
  return sequelize.define('students', {

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
    ValidationToken: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
   
  });

};


export const initInterviewerModel = (sequelize: Sequelize) => {
  return sequelize.define('interviewers', {

    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
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
      allowNull: true,
    },
    ValidationToken: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
  });
};




