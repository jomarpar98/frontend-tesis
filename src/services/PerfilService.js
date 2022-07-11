import axios from "axios";
import url from "../Config.js";

export async function getPerfiles(idPrueba,setPerfiles) {
  let perfiles = await axios.get(`${url}perfilParticipante/${idPrueba}`)
  let newPerfiles = perfiles.data.map((p)=>{
    p.id = p.idPerfilParticipante
    return p
  })
  setPerfiles(newPerfiles)
}

export async function createPerfil(idPrueba,perfil){
  let perfilNuevo = {
    perfil:perfil,
    idPruebaUsabilidad:idPrueba
  }
  await axios.post(`${url}perfilParticipante`,perfilNuevo,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function deletePerfil(idPerfil) {
  await axios.delete(`${url}perfilParticipante/${idPerfil}`)
}

export async function updatePerfil(idPrueba,perfil,idPerfil) {
  let perfilNuevo = {
    idPerfilParticipante:idPerfil,
    perfil:perfil,
    idPruebaUsabilidad:idPrueba
  }
  await axios.put(`${url}perfilParticipante/${idPerfil}`,perfilNuevo,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}
