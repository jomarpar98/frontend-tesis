import axios from "axios";
import url from "../Config.js";
import ROLES from "../constants/Roles.constant";

export async function getMiembros(setMiembros,idPrueba) {
  let miembros = await axios.get(`${url}miembro/${idPrueba}`)
  let datos = miembros.data.map(m=>{
    m.id = m.idUsuario
    m.rol = m.esInvestigador ? (m.esObservador ? 'Investigador y observador' : 'Investigador') : (m.esObservador ? 'Observador' : 'Especifique tipo')
    return m
  })
  setMiembros(datos)

}

export async function createMiembros(miembros) {
  await axios.post(`${url}miembro/bulk`,miembros,{headers:{
      'Content-Type': 'application/json',
    }})
}

export async function deleteMiembro(idPrueba,idUsuario) {
  await axios.delete(`${url}miembro/${idPrueba}/${idUsuario}`)
}

export async function getMiembro(setMiembro,idPrueba,idUsuario){
  let miembro = await axios.get(`${url}miembro/${idPrueba}/${idUsuario}`)
  setMiembro(miembro.data)
}

export async function updateMiembro(miembro) {
  await axios.put(`${url}miembro/${miembro.idPruebaUsabilidad}/${miembro.idUsuario}`,miembro,
    {headers:{
        'Content-Type': 'application/json',
      }
    })
}

export async function getObservadores(setObservadores, idPrueba) {
  let observadores = await axios.get(`${url}miembro/observadores/${idPrueba}`)
  setObservadores(observadores.data)
}
