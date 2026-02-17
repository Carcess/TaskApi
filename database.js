import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'maria',
  password: process.env.DB_PASS || 'M@ria',
  database: process.env.DB_NAME || 'maria',
});