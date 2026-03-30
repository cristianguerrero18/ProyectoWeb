import config from "../config.js";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: Number(config.port),
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0,
});

const getConexion = () => {
  return pool;
};

export default getConexion;