// Importa las variables de configuración de la base de datos
import config from "../config.js";

// Importa mysql2 con soporte para promesas, permitiendo usar async/await
import mysql from "mysql2/promise";

// Crea un pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
  // Servidor donde está alojada la base de datos
  host: config.host,

  // Nombre de la base de datos a utilizar
  database: config.database,

  // Usuario de acceso a MySQL
  user: config.user,

  // Contraseña del usuario de la base de datos
  password: config.password,

  // Puerto de conexión, convertido a número por seguridad
  port: Number(config.port),

  // Permite esperar una conexión disponible cuando todas estén ocupadas
  waitForConnections: true,

  // Límite máximo de conexiones simultáneas al servidor MySQL
  connectionLimit: 3,

  // Sin límite de solicitudes en cola mientras esperan conexión
  queueLimit: 0,
});

// Función que retorna el pool para ser usado en consultas desde otros archivos
const getConexion = () => {
  return pool;
};

// Exporta la función para reutilizar la conexión en controladores o modelos
export default getConexion;
