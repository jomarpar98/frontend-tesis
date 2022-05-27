import axios from "axios";
import url from "../Config.js";

export async function getCuestionarios(setCuestionarios,idPrueba) {
  let cuestionarios = await axios.get(`${url}cuestionario/${idPrueba}`)
  setCuestionarios(cuestionarios.data)

}

export async function createCuestionario(cuestionario) {
  await axios.post(`${url}cuestionario`,cuestionario,{headers:{
      'Content-Type': 'application/json',
    }})
}

export async function deleteCuestionario(idCuestionario) {
  axios.delete(`${url}cuestionario/${idCuestionario}`)
}

export async function updateCuestionario(cuestionario) {
  axios.put(`${url}cuestionario/${cuestionario.idCuestionario}`,cuestionario,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}