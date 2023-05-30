import dotenv from "dotenv";

dotenv.config();

interface ConfigKeys {
  database: string;
  user: string;
  password: string;
  host: string;
  db_port: number;
  PORT:Number
  JWT_SECRET:any,
  OPEN_API_KEY:any 
}
const configKeys: ConfigKeys = {
  database: process.env.database || 'defaultDatabaseName',
  user: process.env.user || 'defaultUser',
  password: process.env.password || '',
  host: process.env.host || 'localhost',
  db_port: parseInt(process.env.db_port || '5432', 10),
  PORT: parseInt(process.env.PORT||"5000",10),
  JWT_SECRET: process.env.JWT_SECRET,
  OPEN_API_KEY:process.env.OPEN_API_KEY||""
};

export default configKeys;
