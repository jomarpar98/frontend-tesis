import axios from "axios";
import url from "../Config.js";

export async function getPruebasUsabilidad(usuario, setPruebas) {
  let pruebas = await axios.get(`${url}pruebaUsabilidad/pruebas/${usuario.idUsuario}`)
  let pruebasResponsable = pruebas.data.map((prueba)=>{
    prueba.responsable = prueba.miembros.find((m)=>{
      return m.idUsuario === prueba.idCreador
    })
    delete prueba.miembros
    delete prueba.participantes
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
  await axios.post(`${url}pruebaUsabilidad`,prueba,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function deletePruebaUsabilidad(idPrueba) {
  await axios.delete(`${url}pruebaUsabilidad/${idPrueba}`)
}

export async function updatePruebaUsabilidad(nombre, enlace, software, idUsuario, idPruebaUsabilidad,eVideoconfe = '') {
  let prueba = {
    nombre: nombre,
    software: software,
    eSistema: enlace,
    eVideoconfe: eVideoconfe,
    creacion: new Date(),
    idCreador: idUsuario
  }
  await axios.put(`${url}pruebaUsabilidad/${idPruebaUsabilidad}`,prueba,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function updateReporte(reporte,idPruebaUsabilidad) {
  let prueba = {
    reporte: reporte
  }
  await axios.put(`${url}pruebaUsabilidad/${idPruebaUsabilidad}`,prueba,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function getReporte(idPruebaUsabilidad,setReporte){
  let reporte = await axios.get(`${url}pruebaUsabilidad/${idPruebaUsabilidad}/reporte`)
  setReporte(reporte.data.reporte)
}

export async function comenzarPrueba(idPruebaUsabilidad,email,idUsuario){
  let body = {
    email: email,
  }
  await axios.post(`${url}pruebaUsabilidad/${idPruebaUsabilidad}/${idUsuario}`,body,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}