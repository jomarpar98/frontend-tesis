import axios from "axios";
import url from "../Config.js";

export async function getTareas(setTareas,idPerfil) {
  let tareas = await axios.get(`${url}tarea/${idPerfil}`)
  setTareas(tareas.data)
}

export async function createTareas(tareas,idPerfil){
  await axios.post(`${url}tarea/${idPerfil}`,tareas,{headers:{
      'Content-Type': 'application/json',
    }})
}