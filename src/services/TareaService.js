import axios from "axios";
import url from "../Config.js";

export async function getTareas(setTareas,idPerfil) {
  let tareas = await axios.get(`${url}tarea/${idPerfil}`)
  setTareas(tareas.data)
}

export async function getTareasObservaciones(setTareas,idPerfil,idParticipante) {
  let tareas = await axios.get(`${url}tarea/${idPerfil}/${idParticipante}`)
  setTareas(tareas.data)
}

export async function getExcelTareasObservaciones(idPerfil,idParticipante) {
  await axios({
    url: `${url}tarea/excel/${idPerfil}/${idParticipante}`,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Observaciones.xlsx');
    document.body.appendChild(link);
    link.click();
  });
}

export async function createTareas(tareas,idPerfil){
  await axios.post(`${url}tarea/${idPerfil}`,tareas,{headers:{
      'Content-Type': 'application/json',
    }})
}

