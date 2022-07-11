import axios from "axios";
import url from "../Config.js";

export async function createParticipante(participante){
  await axios.post(`${url}participante`,participante,{headers:{
      'Content-Type': 'application/json',
    }})
}

export async function getParticipantes(setParticipantes,idPrueba) {
  let participantes = await axios.get(`${url}participante/${idPrueba}`)
  let datos = participantes.data.map(p=>{
    p.id = p.idUsuario
    return p
  })
  setParticipantes(datos)
}

export async function updateParticipantes(participante){
  await axios.put(`${url}participante/${participante.idPruebaUsabilidad}/${participante.idUsuario}`,participante,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function deleteParticipante(idPrueba,idUsuario) {
  await axios.delete(`${url}participante/${idPrueba}/${idUsuario}`)
}

export async function getParticipantesObservados(setParticipantes,idPrueba,idObservador){
  let participantes = await axios.get(`${url}participante/${idPrueba}/${idObservador}`)
  let datos = participantes.data.map(p=>{
    p.id = p.idUsuario
    return p
  })
  setParticipantes(datos)
}

export async function getOneParticipante(setParticipante,idPrueba,idParticipante){
  let participante = await axios.get(`${url}participante/one/${idPrueba}/${idParticipante}`)
  setParticipante(participante.data)
}