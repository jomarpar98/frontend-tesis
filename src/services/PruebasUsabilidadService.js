import axios from "axios";
import url from "../Config.js";

export async function getPruebasUsabilidad(usuario, setPruebas) {
  let pruebas = await axios.get(`${url}pruebaUsabilidad/pruebas/${usuario.idUsuario}`)
  let pruebasResponsable = pruebas.data.pruebas.map((prueba)=>{
    prueba.responsable = pruebas.data.responsables.find((responsable)=>{
      return responsable.idUsuario === prueba.idCreador
    })
    return prueba
  })
  setPruebas(pruebasResponsable)
}

export async function createPruebaUsabilidad(nombre, enlace, software, idUsuario) {
  let prueba = {
    nombre: nombre,
    software: software,
    eSistema: enlace,
    creacion: new Date(),
    idCreador: idUsuario
  }
  axios.post(`${url}pruebaUsabilidad`,prueba,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function deletePruebaUsabilidad(idPrueba) {
  axios.delete(`${url}pruebaUsabilidad/${idPrueba}`)
}