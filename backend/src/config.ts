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
  EMAIL:string,
  EMAIL_PASSWORD:string,
  PAYPAL_CLIENT_ID:string,
  PAYPAL_CLIENT_SECRET:string,
  cloud_name:string, 
  api_key:string,
  api_secret:string
}
const configKeys: ConfigKeys = {
  database: process.env.database || 'defaultDatabaseName',
  user: process.env.user || 'defaultUser',
  password: process.env.password || '',
  host: process.env.host || 'localhost',
  db_port: parseInt(process.env.db_port || '5432', 10),
  PORT: parseInt(process.env.PORT||"5000",10),
  JWT_SECRET: process.env.JWT_SECRET,
  OPEN_API_KEY:process.env.OPEN_API_KEY||"",
  EMAIL:process.env.EMAIL||"",
  EMAIL_PASSWORD:process.env.EMAIL_PASSWORD||"",
  PAYPAL_CLIENT_ID:process.env. PAYPAL_CLIENT_ID||"",
  PAYPAL_CLIENT_SECRET:process.env.PAYPAL_CLIENT_SECRET||"",
  cloud_name:process.env.cloud_name||"",
  api_key:process.env.api_key||"",
  api_secret:process.env.api_secret||""

};

export default configKeys;
