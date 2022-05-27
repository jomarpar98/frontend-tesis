import axios from "axios";
import url from "../Config.js";

export async function createPreguntas(preguntas,idCuestionario) {
  await axios.post(`${url}pregunta/${idCuestionario}`,preguntas,{headers:{
      'Content-Type': 'application/json',
    }})
}

export async function getPreguntas(setPreguntas,idCuestionario){
  let preguntas = await axios.get(`${url}pregunta/${idCuestionario}`)
  setPreguntas(preguntas.data)
}

export async function getEntrevista(setPreguntas,idPrueba) {
  let preguntas = await axios.get(`${url}pregunta/entrevista/${idPrueba}`)
  setPreguntas(preguntas.data)
}

export async function createEntrevista(preguntas,idPrueba) {
  await axios.post(`${url}pregunta/entrevista/${idPrueba}`,preguntas,{headers:{
      'Content-Type': 'application/json',
    }})
}