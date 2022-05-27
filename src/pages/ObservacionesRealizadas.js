import {Grid, InputAdornment, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useContext, useEffect, useState} from "react";
import ButtonTesis from "../components/ButtonTesis";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from '@mui/icons-material/Person';
import DataGridTesis from "../components/DataGridTesis";
import {ColumnsParticipantes} from "../constants/ColumnsParticipantes.constant";
import TexfieldTesis from "../components/TexfieldTesis";
import {Search} from "@material-ui/icons";
import {ColumnsAgregarMiembros} from "../constants/ColumnsAgregarMiembros.constant";
import DialogTesis from "../components/DialogTesis";
import {ColumnsPerfiles} from "../constants/ColumnsPerfiles.constant";
import LabelTesis from "../components/LabelTesis";
import SaveIcon from "@mui/icons-material/Save";
import {createPerfil, deletePerfil, getPerfiles, updatePerfil} from "../services/PerfilService";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {getObservadores} from "../services/MiembroService";
import {
  createParticipante,
  deleteParticipante,
  getParticipantes,
  updateParticipantes
} from "../services/ParticipanteService";

const ObservacionesRealizadas = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [openNuevoPerfil,setOpenNuevoPerfil] = useState(false);
  const [openPerfiles,setOpenPerfiles] = useState(false);
  const [openNuevoParticipante,setOpenNuevoParticipante] = useState(false);
  const [recordsFiltered, setRecordsFiltered] = useState([]);
  const [nombrePerfil,setNombrePerfil] = useState([]);
  const [participantes,setParticipantes] = useState([])
  const [perfiles,setPerfiles] = useState([])
  const [observadores,setObservadores] = useState([])
  const [esNuevoPerfil,setEsNuevoPerfil] = useState(true);
  const [esNuevoParticipante,setEsNuevoParticipante] = useState(true);

  const [nombreParticipante,setNombreParticipante] = useState('')
  const [apPaterno,setApPaterno] = useState('')
  const [apMaterno,setApMaterno] = useState('')
  const [email,setEmail] = useState('')
  const [idSelect,setIdSelect] = useState(null);
  const [idSelectParticipante,setIdSelectParticipante] = useState(null);
  const [consentimiento,setConsentimiento] = useState(false);
  const [perfilSeleccionado,setPerfilSeleccionado] = useState("noPerfiles")
  const [observadorSeleccionado,setObservadorSeleccionado] = useState("noObservador")

  const [fetchPerfiles,setFetchPerfiles] = useState(false);

  useEffect(()=>{
    getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setRecordsFiltered)
    getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setPerfiles)
    getObservadores(setObservadores,pruebaUsabilidad.idPruebaUsabilidad)
    getParticipantes(setParticipantes,pruebaUsabilidad.idPruebaUsabilidad)
  },[fetchPerfiles])

  const handleClickRegresar = () =>{
    history.push("/analisis-prueba-usabilidad");
  }

  const handleClosePerfiles = () =>{
    setOpenPerfiles(false)
  }

  const handleOpenPerfiles = () =>{
    setOpenPerfiles(true)
  }

  const handleCloseNuevoPerfil = () =>{
    setOpenNuevoPerfil(false)
  }

  const handleCloseNuevoParticipante = () =>{
    setOpenNuevoParticipante(false)
  }

  const handleOpenNuevoParticipante = (nuevo,participante={}) =>{
    setEsNuevoParticipante(nuevo)
    if(nuevo){
      setNombreParticipante('')
      setApMaterno('')
      setApPaterno('')
      setEmail('')
      setConsentimiento(false)
      setPerfilSeleccionado(perfiles.length > 0 ? perfiles[0].idPerfilParticipante:"noPerfiles")
      setObservadorSeleccionado(observadores.length > 0 ? observadores[0].idUsuario : "noObservador")
    } else {
      setNombreParticipante(participante.Usuario.nombre)
      setApMaterno(participante.Usuario.apMaterno)
      setApPaterno(participante.Usuario.apPaterno)
      setEmail(participante.Usuario.email)
      setConsentimiento(participante.concentimiento)
      setPerfilSeleccionado(participante.PerfilParticipante.idPerfilParticipante)
      setObservadorSeleccionado(participante.Observador.idUsuario)
      setIdSelectParticipante(participante.idUsuario)
    }
    setOpenNuevoParticipante(true)
  }

  const handleOpenNuevoPerfil = (nuevo,perfil={}) =>{
    setEsNuevoPerfil(nuevo)
    if(nuevo){
      setNombrePerfil('')
    } else {
      setIdSelect(perfil.idPerfilParticipante)
      setNombrePerfil(perfil.perfil)
    }
    setOpenNuevoPerfil(true)
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    let filtered
    if (value === "")
      filtered = perfiles;
    else
      filtered = perfiles.filter(x => `${x.perfil}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  const handleNombrePerfilChange = (e) => {
    setNombrePerfil(e.target.value)
  }

  const handleGuardarPerfil = () => {
    if(esNuevoPerfil){
      createPerfil(pruebaUsabilidad.idPruebaUsabilidad,nombrePerfil).then(()=>{
        setFetchPerfiles(!fetchPerfiles)
      })
    }
    else {
      updatePerfil(pruebaUsabilidad.idPruebaUsabilidad,nombrePerfil,idSelect).then(()=>{
        setFetchPerfiles(!fetchPerfiles)
      })
    }
    setOpenNuevoPerfil(false)
  }

  const handleGuardarParticipante = () => {
    let participante = {
      nombre: nombreParticipante,
      apPaterno: apPaterno,
      apMaterno: apMaterno,
      email: email,
      concentimiento: consentimiento,
      idPruebaUsabilidad: pruebaUsabilidad.idPruebaUsabilidad,
      idPerfil: perfilSeleccionado,
      idObservador: observadorSeleccionado,
    }
    if(idSelectParticipante !== null) {participante.idUsuario = idSelectParticipante}
    if(esNuevoParticipante){
      createParticipante(participante).then(()=>{
        setFetchPerfiles(!fetchPerfiles)
      })
    }
    else {
      updateParticipantes(participante).then(()=>{
        setTimeout(()=>{
          setFetchPerfiles(!fetchPerfiles)
        },1500)
      })
    }
    setOpenNuevoParticipante(false)
  }

  const handleDeletePerfil = (idPerfil) => {
    deletePerfil(idPerfil).then(()=>{
      setFetchPerfiles(!fetchPerfiles)
    })
  }

  const handleDeleteParticipante = (idUsuario) => {
    deleteParticipante(pruebaUsabilidad.idPruebaUsabilidad,idUsuario).then(()=>{
      setFetchPerfiles(!fetchPerfiles)
    })
  }

  const handleNombreParticipanteChange = (e) => {
    setNombreParticipante(e.target.value)
  }

  const handleApPaternoChange = (e) => {
    setApPaterno(e.target.value)
  }

  const handleApMaternoChange = (e) => {
    setApMaterno(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSelection = e => {
    const {name, value} = e.target;
    setPerfilSeleccionado(value)
  }

  const handleSelectionObservador = e =>{
    const {name, value} = e.target;
    setObservadorSeleccionado(value)
  }

  return (
    <Grid width={'80%'} m="auto" sx={{mt: 5}}>
      <Grid container xs={12} justifyContent="flex-start" alignItems="center">
        <Grid item>
          <IconButtonTesis disableRipple={true} size="large" sx={{color: "primary.main", display: "block"}} onClick={handleClickRegresar}>
            <ArrowBackIcon/>
            <Typography sx={{lineHeight: 0}}>Atrás</Typography>
          </IconButtonTesis>
        </Grid>
        <Grid item>
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Participantes</Typography>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <DataGridTesis
          rows={participantes}
          columns={ColumnsParticipantes(handleOpenNuevoParticipante,handleDeleteParticipante)}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
        />
      </Grid>
    </Grid>
  )

}

export default ObservacionesRealizadas