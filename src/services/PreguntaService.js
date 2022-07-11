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

export async function getPreguntasRespuestas(setPreguntas, idCuestionario) {
  let preguntas = await axios.get(`${url}pregunta/respuestas/${idCuestionario}`)
  let datos = preguntas.data.map((p)=>{
    if(p.idTipoPregunta !==0){
      let data = p.alternativas.map((a)=>{
        return (a.respuestas)
      })
      p.alternativas.labels = p.alternativas.map((a)=>a.alternativa)
      p.alternativas.datasets = [{
        label: "Respuestas",
        data: data,
        backgroundColor: ["lightBlue"],
        borderColor: "black",
        borderWidth: 2,
        barThickness: 100,
      }]
    }
    return p
  })
  setPreguntas(datos)
}

export async function getExcelPreguntasRespuestas(idCuestionario) {
  await axios({
    url: `${url}pregunta/excel/${idCuestionario}`,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Respuestas.xlsx');
    document.body.appendChild(link);
    link.click();
  });
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