import axios from "axios";
import url from "../Config.js";
import ROLES from "../constants/Roles.constant";

export async function getUsuarios(setUsuarios,setRecordsFiltered) {
  let usuarios = await axios.get(`${url}usuario`)
  let usuariosFiltrados = usuarios.data.filter((u)=>{return u.idRol !== 3})
  let usuariosFinal = usuariosFiltrados.map((u)=>{
    let usuario = u
    usuario.rol = ROLES[u.idRol]
    usuario.id = u.idUsuario
    return u
  })
  setUsuarios(usuariosFinal)
  setRecordsFiltered(usuariosFinal)
}

export async function newUsuario(nombre, apPaterno, apMaterno, email, idRol) {
  let usuario = {
    nombre: nombre,
    apPaterno: apPaterno,
    apMaterno: apMaterno,
    email: email,
    idRol: idRol
  }
  await axios.post(`${url}usuario`,usuario,{headers:{
      'Content-Type': 'application/json',
    }})
}

export async function updateUsuario(id, nombre, apPaterno, apMaterno, email, idRol) {
  let usuario = {
    nombre: nombre,
    apPaterno: apPaterno,
    apMaterno: apMaterno,
    email: email,
    idRol: idRol
  }
  await axios.put(`${url}usuario/${id}`,usuario,{headers:{
      'Content-Type': 'application/json',
    }})
}

export async function deleteUsuario(id) {
  await axios.delete(`${url}usuario/${id}`)
}

export async function getDisponibles(setMiembros,idPrueba,idUsuario){
  let miembros = await axios.get(`${url}usuario/disponibles/${idPrueba}/${idUsuario}`)
  let datos = miembros.data.map(m=>{
    m.id = m.idUsuario
    m.rol = ROLES[m.idRol]
    return m
  })
  setMiembros(datos)
}