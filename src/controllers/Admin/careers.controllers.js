import CarrerasModel from "../../models/Admin/careers.models.js";

const getCarrera = async (req, res) => {
  try {
    const result = await CarrerasModel.getCarreras();
    if (!result) {
      res.status(404).json({ mensaje: "nose se encontraron datos" });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ mensaje: `Error en el api ${error}` });
  }
};

const postCarrera = async (req, res) => {
  try {
    await Promise.all(
      req.body.map((carrera) =>
        CarrerasModel.postCarreras(carrera)
      )
    );

    res.status(200).json({ mensaje: "Todas las carreras fueron agregadas correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: `Error en el api ${error}` });
  }
};


const putCarrera = async (req, res) => {
  const {nombre_carrera,id_tipo_carrera,Descripcion,id_carrera} = req.body;
  try {
    const result =  await CarrerasModel.putCarreras({nombre_carrera,id_tipo_carrera,Descripcion,id_carrera});
    if(result==0){
        res.status(500).json({mensaje : "nose pudo actualizar la Carrera"})
    }else {
        res.status(200).json({mensaje : ` Carrera Actualizada Correctamente : ${nombre_carrera}`})
    }
  } catch (error) {
    res.status(500).json({ mensaje: `Error en el api ${error}` });
  }
};

const deleteCarrera = async (req, res) => {
  const { id_carrera } = req.params;
  try {
    const result = await CarrerasModel.deleteCarreras(id_carrera);
    if(result == 0 ){
        res.status(404).json({mensaje : `nose se encontro la Carrera con id ${id_carrera}` })
    }else { 
        res.status(200).json({mensaje : `eliminado correctamente la Carrera ${id_carrera}`})
    }
  } catch (error) {
    res.json({ mensaje: `error en el api verifica ${error}` });
  }
};
const getCarrerasPortipo = async (req,res) => {
  const {id_tipo_carrera} = req.params ; 
  try {
    const result = await CarrerasModel.getCarrerasPortipo(id_tipo_carrera);
    if (!result) {
      res.status(404).json({ mensaje: "nose se encontraron datos" });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ mensaje: `Error en el api ${error}` });
  }
}
export const method = {
  getCarrera,
  postCarrera,
  putCarrera,
  deleteCarrera,
  getCarrerasPortipo
};
