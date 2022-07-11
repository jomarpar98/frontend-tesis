import axios from "axios";
import url from "../Config.js";

export async function createObservaciones(observaciones,idParticipante,idObservador) {
  await axios.post(`${url}observacion/${idParticipante}/${idObservador}`,observaciones,{headers:{
      'Content-Type': 'application/json',
    }})
}

export async function getObservaciones(setObservaciones,idParticipante,idObservador,idPrueba){
  let observaciones = await axios.get(`${url}observacion/${idParticipante}/${idObservador}/${idPrueba}`)
  setObservaciones(observaciones.data)
}