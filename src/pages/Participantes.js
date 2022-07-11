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
import NotificationTesis from "../components/NotificationTesis";

const Participantes = () =>{
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
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  const [fetchPerfiles,setFetchPerfiles] = useState(false);

  useEffect(()=>{
    getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setRecordsFiltered)
    getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setPerfiles)
    getObservadores(setObservadores,pruebaUsabilidad.idPruebaUsabilidad)
    getParticipantes(setParticipantes,pruebaUsabilidad.idPruebaUsabilidad)
  },[fetchPerfiles])

  const handleClickRegresar = () =>{
    history.push("/visualizar-prueba-usabilidad");
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
      setConsentimiento(participante.consentimiento)
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
      setNotify({
        isOpen: true,
        message: 'Creando perfil',
        type: 'info'})
      createPerfil(pruebaUsabilidad.idPruebaUsabilidad,nombrePerfil).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Perfil creado correctamente',
          type: 'success'})
        setFetchPerfiles(!fetchPerfiles)
        getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setRecordsFiltered)
        getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setPerfiles)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al crear',
          type: 'error'})
      })
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Actualizando perfil',
        type: 'info'})
      updatePerfil(pruebaUsabilidad.idPruebaUsabilidad,nombrePerfil,idSelect).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Perfil actualizado correctamente',
          type: 'success'})
        setFetchPerfiles(!fetchPerfiles)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al actualizar',
          type: 'error'})
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
      consentimiento: consentimiento,
      idPruebaUsabilidad: pruebaUsabilidad.idPruebaUsabilidad,
      idPerfil: perfilSeleccionado,
      idObservador: observadorSeleccionado,
    }
    if(idSelectParticipante !== null) {participante.idUsuario = idSelectParticipante}
    if(esNuevoParticipante){
      setNotify({
        isOpen: true,
        message: 'Creando participante',
        type: 'info'})
      createParticipante(participante).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Participante creado correctamente',
          type: 'success'})
        setFetchPerfiles(!fetchPerfiles)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al crear',
          type: 'error'})
      })
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Actualizando participante',
        type: 'info'})
      updateParticipantes(participante).then(()=>{
          setNotify({
            isOpen: true,
            message: 'Participante actualizado correctamente',
            type: 'success'})
          setFetchPerfiles(!fetchPerfiles)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al actualizar',
          type: 'error'})
      })
    }
    setOpenNuevoParticipante(false)
  }

  const handleDeletePerfil = (idPerfil) => {
    setNotify({
      isOpen: true,
      message: 'Eliminando perfil',
      type: 'info'})
    deletePerfil(idPerfil).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Perfil eliminado correctamente',
        type: 'success'})
      setFetchPerfiles(!fetchPerfiles)
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al eliminar',
        type: 'error'})
    })
  }

  const handleDeleteParticipante = (idUsuario) => {
    setNotify({
      isOpen: true,
      message: 'Eliminando participante',
      type: 'info'})
    deleteParticipante(pruebaUsabilidad.idPruebaUsabilidad,idUsuario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Perfil eliminado correctamente',
        type: 'success'})
      setFetchPerfiles(!fetchPerfiles)
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al eliminar',
        type: 'error'})
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
      <Grid container xs={12}>
        <Grid item xs={6}>
          <ButtonTesis label="Agregar participante" onClick={()=>handleOpenNuevoParticipante(true)} variant="contained" endIcon={<AddIcon/>}/>
        </Grid>
        <Grid item xs={6} sx={{textAlign: 'end'}}>
          <ButtonTesis label="Perfiles" onClick={handleOpenPerfiles} variant="contained" endIcon={<PersonIcon/>}/>
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
      <DialogTesis onHide={handleClosePerfiles} visible={openPerfiles} title={"Perfiles"}>
        <Grid container>
          <Grid item xs={5}>
            <TexfieldTesis
              variant="outlined"
              placeholder="Buscar por nombre"
              InputProps={{ startAdornment:  ( <InputAdornment position="start"> <Search /> </InputAdornment> )}}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={7} sx={{textAlign: 'end',alignSelf:'center'}}>
            <ButtonTesis label="Agregar" variant="contained" onClick={()=>handleOpenNuevoPerfil(true)} endIcon={<AddIcon/>} />
          </Grid>
        </Grid>
        <Grid xs={12} sx={{pt: 3}}>
          <DataGridTesis
            rows={ recordsFiltered.length!==0 ? recordsFiltered :[]}
            columns={ColumnsPerfiles(handleOpenNuevoPerfil,handleDeletePerfil)}
            pageSize={5}
            disableSelectionOnClick
            disableColumnSelector
            disableColumnFilter
            disableColumnMenu
          />
        </Grid>
      </DialogTesis>
      <DialogTesis onHide={handleCloseNuevoPerfil} visible={openNuevoPerfil} title={esNuevoPerfil ? "Nuevo perfil" : "Editar perfil"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Nombre</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={nombrePerfil} onBlur={handleNombrePerfilChange}/>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop:'10px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseNuevoPerfil} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={handleGuardarPerfil} variant="contained" endIcon={<SaveIcon/>}/>
          </Grid>
        </Grid>
      </DialogTesis>
      <DialogTesis onHide={handleCloseNuevoParticipante} visible={openNuevoParticipante} title={esNuevoParticipante ? "Nuevo participante" : "Editar participante"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Nombre</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={nombreParticipante} onBlur={handleNombreParticipanteChange}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Apellido parterno</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={apPaterno} onBlur={handleApPaternoChange}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Apellido materno</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={apMaterno} onBlur={handleApMaternoChange}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Email</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={email} onBlur={handleEmailChange}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Perfil</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <Select
              variant="outlined"
              defaultValue={perfilSeleccionado}
              onChange={handleSelection}
              sx={{width:'100%'}}
            >
              {perfiles.length === 0 && <MenuItem key={1} value={"noPerfiles"}>No hay perfiles</MenuItem>}
              {perfiles.map(perfil => (<MenuItem key={perfil.idPerfilParticipante} value={perfil.idPerfilParticipante}>{perfil.perfil}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Observador</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <Select
              variant="outlined"
              defaultValue={observadorSeleccionado}
              onChange={handleSelectionObservador}
              sx={{width:'100%'}}
            >
              {observadores.length === 0 && <MenuItem key={1} value={"noObservador"}>No hay observadores</MenuItem>}
              {observadores.map(observador => (<MenuItem key={observador.idUsuario} value={observador.idUsuario}>{`${observador.Usuario.nombre} ${observador.Usuario.apPaterno} ${observador.Usuario.apMaterno}`}</MenuItem>))}
            </Select>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop:'10px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseNuevoParticipante} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={handleGuardarParticipante} variant="contained" endIcon={<SaveIcon/>}/>
          </Grid>
        </Grid>
      </DialogTesis>
      <NotificationTesis
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Grid>
  )

}

export default Participantes