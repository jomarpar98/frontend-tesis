import axios from "axios";
import url from "../Config";

export async function getRespuestas(setPreguntas,preguntas,idUsuario){
  let preguntaRespuesta = await Promise.all(preguntas.map(async (p)=>{
    let respuestas = await axios.get(`${url}respuesta/${p.idPregunta}/${idUsuario}`)
    p.respuestas = respuestas.data.length === 0 && p.idTipoPregunta !== 1 ? (p.idTipoPregunta === 0 ? [{
      respuesta:'',
      idPregunta:p.idPregunta,
      idParticipante: idUsuario,
    }] : [{idPregunta:p.idPregunta, idParticipante: idUsuario, idAlternativa: null}] ) : respuestas.data
    return p
  }))
  console.log(preguntaRespuesta)
  setPreguntas(preguntaRespuesta)
}

export async function createRespuestas(preguntas,respuestas,idUsuario){
  await axios.post(`${url}respuesta/${idUsuario}`,{preguntas:preguntas,respuestas:respuestas},{headers:{
      'Content-Type': 'application/json',
    }})
}