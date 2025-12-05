
import getConexion from "../../db/database.js";
import { format } from "date-fns";

const upsertVerification = async ({ email, codigo, expira }) => {
  const conexion = await getConexion();
  const [result] = await conexion.query(
    `UPDATE verificacion SET codigo = ?, expira = ?, intentos = 0, bloqueado = 0 WHERE email = ?`,
    [codigo, expira, email]
  );

  if (result.affectedRows === 0) {
    await conexion.query(
      `INSERT INTO verificacion (email, codigo, expira) VALUES (?, ?, ?)`,
      [email, codigo, expira]
    );
  }
};

const getByEmail = async (email) => {
  const conexion = await getConexion();
  const [rows] = await conexion.query(`SELECT * FROM verificacion WHERE email = ?`, [email]);
  return rows[0];
};

const deleteByEmail = async (email) => {
  const conexion = await getConexion();
  await conexion.query(`DELETE FROM verificacion WHERE email = ?`, [email]);
};

const incrementIntentos = async (email) => {
  const conexion = await getConexion();
  await conexion.query(`UPDATE verificacion SET intentos = intentos + 1 WHERE email = ?`, [email]);
  const [rows] = await conexion.query(`SELECT intentos FROM verificacion WHERE email = ?`, [email]);
  return rows[0]?.intentos ?? 0;
};

const bloquear = async (email) => {
  const conexion = await getConexion();
  await conexion.query(`UPDATE verificacion SET bloqueado = 1 WHERE email = ?`, [email]);
};

export default {
  upsertVerification,
  getByEmail,
  deleteByEmail,
  incrementIntentos,
  bloquear
};
