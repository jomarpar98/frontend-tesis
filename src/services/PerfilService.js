import axios from "axios";
import url from "../Config.js";

export async function getPerfiles(idPrueba,setPerfilSeleccionado,setPerfiles) {
  let perfiles = await axios.get(`${url}perfilParticipante/${idPrueba}`)
  if(perfiles.data.length > 0) {
    setPerfilSeleccionado(perfiles.data[0])
    setPerfiles(perfiles.data)
  }

}