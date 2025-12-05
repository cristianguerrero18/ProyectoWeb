import getConexion from "../../db/database.js";
const conexion = await getConexion();
const CarrerasModel = {
  getCarreras: async () => {
    const [rows] = await conexion.query("SELECT * FROM carreras");
    return rows;
  },
  postCarreras: async ({nombre_carrera,id_tipo_carrera,Descripcion}) => {
    const [rows] = await conexion.query("INSERT INTO carreras (nombre_carrera,id_tipo_carrera,Descripcion) values (?,?,?)" , [nombre_carrera,id_tipo_carrera,Descripcion])
     return rows.affectedRows;
   },
   putCarreras: async ({nombre_carrera,id_tipo_carrera,Descripcion,id_carrera}) => {
    const [rows] = await conexion.query("UPDATE carreras SET nombre_carrera=?, id_tipo_carrera=? , Descripcion=? where id_carrera=? " , [nombre_carrera,id_tipo_carrera,Descripcion,id_carrera])
     return rows.affectedRows;
   },
   deleteCarreras : async (id_carrera) => { 
    const [rows] = await conexion.query("DELETE FROM carreras WHERE id_carrera=?" ,[id_carrera])
    return rows.affectedRows;
   },
   getCarrerasPortipo : async (id_tipo_carrera) => {
    const [rows] = await conexion.query("SELECT nombre_carrera, id_carrera from Carreras where id_tipo_carrera=?",[id_tipo_carrera])
    return rows;
   }
}

export default CarrerasModel;