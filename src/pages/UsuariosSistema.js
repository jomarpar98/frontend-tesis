import {Grid, InputAdornment, MenuItem, Select, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import TexfieldTesis from "../components/TexfieldTesis";
import {Search} from "@material-ui/icons";
import ButtonTesis from "../components/ButtonTesis";
import AddIcon from "@mui/icons-material/Add";
import DataGridTesis from "../components/DataGridTesis";
import {ColumnsUsuarios} from "../constants/ColumnsUsuarios.constant";
import LabelTesis from "../components/LabelTesis";
import SaveIcon from "@mui/icons-material/Save";
import DialogTesis from "../components/DialogTesis";
import {deleteUsuario, getUsuarios, newUsuario, updateUsuario} from "../services/UsuarioService";
import ROLES from "../constants/Roles.constant";
import NotificationTesis from "../components/NotificationTesis";

const UsuariosSistema = () => {

  const[usuarios,setUsuarios] = useState([]);
  const[recordsFiltered, setRecordsFiltered] = useState([]);
  const[openNuevoUsuario,setOpenNuevoUsuario] = useState(false);
  const[nombre,setNombre] = useState("");
  const[apPaterno,setApPaterno] = useState("");
  const[apMaterno,setApMaterno] = useState("");
  const[email,setEmail] = useState("");
  const[idRol,setIdRol] = useState(2);
  const[esNuevo,setEsNuevo] = useState(true);
  const[disable,setDisable] = useState(false);
  const[idSeleccionado,setIdSeleccionado] = useState(null);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  useEffect(()=>{
    getUsuarios(setUsuarios,setRecordsFiltered);
  },[])

  useEffect(()=>{
    console.log(recordsFiltered)
  },[recordsFiltered])

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    let filtered
    if (value === "")
      filtered = usuarios;
    else
      filtered = usuarios.filter(x => `${x.nombre}${x.apPaterno}${x.apMaterno}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  const handleCloseNuevoUsuario = () => {
    setOpenNuevoUsuario(false);
  }

  const handleOpen = (nuevo,usuario = {}) => {
    setEsNuevo(nuevo)
    if (nuevo) {
      setApPaterno('')
      setApMaterno('')
      setNombre('')
      setEmail('')
      setIdRol(2)
    } else {
      setIdSeleccionado(usuario.idUsuario)
      setNombre(usuario.nombre)
      setApPaterno(usuario.apPaterno)
      setApMaterno(usuario.apMaterno)
      setEmail(usuario.email)
      setIdRol(usuario.idRol)
    }
    setOpenNuevoUsuario(true);
  }

  const handleNombreChange = (e) => {
    setNombre(e.target.value)
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
    setIdRol(value)
  }

  const handleGuardar = () => {
    setDisable(true)
    if(esNuevo){
      setNotify({
        isOpen: true,
        message: 'Creando usuario',
        type: 'info'})
      newUsuario(nombre,apPaterno,apMaterno,email,idRol).then(()=>{
        setDisable(false)
        setOpenNuevoUsuario(false)
          setNotify({
            isOpen: true,
            message: 'Usuario creado correctamente',
            type: 'success'})
          getUsuarios(setUsuarios,setRecordsFiltered);
      }
      )
    } else {
      setNotify({
        isOpen: true,
        message: 'Actualizando usuario',
        type: 'info'})
      updateUsuario(idSeleccionado,nombre,apPaterno,apMaterno,email,idRol).then(()=>{
          setDisable(false)
          setOpenNuevoUsuario(false)
        setNotify({
          isOpen: true,
          message: 'Usuario actualizado correctamente',
          type: 'success'})
        getUsuarios(setUsuarios,setRecordsFiltered);
      }
      )
    }
  }

  const handleDelete = (idUsuario) => {
    setNotify({
      isOpen: true,
      message: 'Eliminando usuario',
      type: 'info'})
    deleteUsuario(idUsuario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Usuario eliminado correctamente',
        type: 'success'})
      getUsuarios(setUsuarios,setRecordsFiltered);
      }
    )
  }

  return (
    <Grid width={'80%'} m="auto" sx={{mt: 5}}>
      <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2,textAlign: 'center'}}>Usuarios del sistema</Typography>
      <Grid container>
        <Grid item xs={10}>
          <TexfieldTesis
            variant="outlined"
            placeholder="Buscar por nombre"
            InputProps={{ startAdornment:  ( <InputAdornment position="start"> <Search /> </InputAdornment> )}}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={2} sx={{textAlign: 'end'}}>
          <ButtonTesis label="Nuevo Usuario" variant="contained" onClick={()=>handleOpen(true)} endIcon={<AddIcon/>} />
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <DataGridTesis
          rows={recordsFiltered ? recordsFiltered :[{
            nombre: 'Juan',
            apPaterno: 'Pareja',
            apMaterno: 'Gutierrez',
            rol: 'Investigador',
            email: 'correo@gmail',
            id: 1
          },
            {
              nombre: 'Andres',
              apPaterno: 'Pareja',
              apMaterno: 'Gutierrez',
              rol: 'Investigador',
              email: 'correo@gmail',
              id: 2
            }
          ]}
          columns={ColumnsUsuarios(handleOpen,handleDelete)}
          disableSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          disableColumnMenu
        />
      </Grid>
      <DialogTesis onHide={handleCloseNuevoUsuario} visible={openNuevoUsuario} title={esNuevo ? "Nueva prueba de usabilidad" : "Editar prueba de usabilidad"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Nombre</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={nombre} onBlur={handleNombreChange}/>
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
            <LabelTesis>Rol</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <Select
              variant="outlined"
              defaultValue={idRol}
              onChange={handleSelection}
              sx={{width: '100%'}}
            >
              <MenuItem key={2} value={2}>{ROLES[2]}</MenuItem>
              <MenuItem key={1} value={1}>{ROLES[1]}</MenuItem>
              <MenuItem key={4} value={4}>{ROLES[4]}</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop: '10px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseNuevoUsuario} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" disabled={disable} endIcon={<SaveIcon/>}/>
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

export default UsuariosSistema