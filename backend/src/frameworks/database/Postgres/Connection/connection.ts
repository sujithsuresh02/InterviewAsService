import { Sequelize } from 'sequelize';
import configKeys from '../../../../config';

// Create a new Sequelize instance
export const sequelize = new Sequelize(
  configKeys.database ,
  configKeys.user ,
  configKeys.password,
  
  {
    host: configKeys.host,
     port: configKeys.db_port,
    dialect: 'postgres',
  
  }
);

// Connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL databasee');
    // Perform database operations here
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
};

export default connectDB;
