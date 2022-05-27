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
  axios.put(`${url}participante/${participante.idPruebaUsabilidad}/${participante.idUsuario}`,participante,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function deleteParticipante(idPrueba,idUsuario) {
  axios.delete(`${url}participante/${idPrueba}/${idUsuario}`)
}