import {Grid, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useContext, useEffect, useState} from "react";
import LabelTesis from "../components/LabelTesis";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {format} from "date-fns";
import AddBar from "../components/AddBar";
import TexfieldTesis from "../components/TexfieldTesis";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import DialogTesis from "../components/DialogTesis";
import {createPruebaUsabilidad} from "../services/PruebaUsabilidadService";
import {getPerfiles} from "../services/PerfilService";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {UserContext} from "../context/UserContext";
import {
  createCuestionario,
  deleteCuestionario,
  getCuestionarios,
  updateCuestionario
} from "../services/CuestionarioService";
import NotificationTesis from "../components/NotificationTesis";

const Cuestionarios = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [recordsFiltered, setRecordsFiltered] = useState([]);
  const[openNuevoCuestionario,setOpenNuevoCuestionario] = useState(false);
  const[esNuevo,setEsNuevo] = useState(true);
  const[disable,setDisable] = useState(false);
  const[nombreCuestionario,setNombreCuestionario] = useState('');
  const [perfiles,setPerfiles] = useState([]);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState("noPerfiles");
  const [idSeleccionado,setIdSeleccionado] = useState(null);
  const [fetch,setFetch] = useState(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  const handleClickRegresar = () =>{
    history.push("/visualizar-prueba-usabilidad");
  }

  const handleNombreChange = (e) => {
    setNombreCuestionario(e.target.value)
  }

  const handleCloseNuevoCuestionario = () => {
    setOpenNuevoCuestionario(false);
  }

  const handleOpen = (nuevo,cuestionario = {},e) => {
    setEsNuevo(nuevo)
    if (nuevo) {
      setNombreCuestionario('')
      setPerfilSeleccionado(perfiles.length > 0 ? perfiles[0].idPerfilParticipante:"noPerfiles")
    } else {
      e.stopPropagation()
      setIdSeleccionado(cuestionario.idCuestionario)
      setNombreCuestionario(cuestionario.nombre)
      setPerfilSeleccionado(cuestionario.idPerfil)
    }
    setOpenNuevoCuestionario(true);
  }

  const handleDelete = (cuestionario,e) => {
    e.stopPropagation()
    setNotify({
      isOpen: true,
      message: 'Eliminando cuestionario',
      type: 'info'})
    deleteCuestionario(cuestionario.idCuestionario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Cuestionario eliminado correctamente',
        type: 'success'})
      setFetch(!fetch)
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al eliminar',
        type: 'error'})
    })
  }

  const handleNext = (cuestionario) => {
    history.push({
      pathname: "/visaulizar-cuestionario",
      search: '?query=abc',
      state: {
        idCuestionario: cuestionario.idCuestionario,
        nombreCuestionario: cuestionario.nombre,
      }
    });
  }

  const handleAdd = (e) => {
    handleOpen(true,e)
  }

  const handleGuardar = () => {
    setDisable(true)
    let cuestionario = {
      nombre : nombreCuestionario,
      esEntrevista: 0,
      esTareas: 0,
      idPerfil: perfilSeleccionado,
    }
    if(idSeleccionado !== null) {cuestionario.idCuestionario = idSeleccionado}
    if (esNuevo) {
      setNotify({
        isOpen: true,
        message: 'Creando cuestionario',
        type: 'info'})
      createCuestionario(cuestionario).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Cuestionario creado correctamente',
          type: 'success'})
        setDisable(false)
        setFetch(!fetch)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al crear',
          type: 'error'})
      })
    } else {
      setNotify({
        isOpen: true,
        message: 'Actualizando cuestionario',
        type: 'info'})
      updateCuestionario(cuestionario).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Cuestionario actualizado correctamente',
          type: 'success'})
        setDisable(false)
        setFetch(!fetch)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al actualizar',
          type: 'error'})
      })
    }
    setOpenNuevoCuestionario(false)
  }

  const handleSelection = e => {
    const {name, value} = e.target;
    setPerfilSeleccionado(value)
  }

  useEffect(()=>{
    getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setPerfiles)
    getCuestionarios(setRecordsFiltered,pruebaUsabilidad.idPruebaUsabilidad)
  },[fetch])

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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Cuestionarios</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {recordsFiltered.map((cuestionario,i) =>
          <Grid container onClick={()=>handleNext(cuestionario)} xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.casillas, padding: '10px',
            paddingLeft: '20px',paddingRight:'20px',borderRadius: '15px'}}>
            <Grid item xs={10}>
              <LabelTesis fontSize="20px" fontWeight="bold">{cuestionario.nombre}</LabelTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={(e)=>handleOpen(false,cuestionario,e)}>
                <EditIcon/>
                </IconButtonTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={(e)=>handleDelete(cuestionario,e)}>
                <DeleteForeverIcon/>
              </IconButtonTesis>
            </Grid>
            <Grid item xs={5}>
              <LabelTesis>{`Perfil del participante: ${cuestionario.PerfilParticipante.perfil}`}</LabelTesis>
            </Grid>
            <Grid item xs={4}>
              <LabelTesis>{`Numero de preguntas: ${cuestionario.preguntas}`}</LabelTesis>
            </Grid>
          </Grid>
        )}
        {recordsFiltered.length === 0 &&
          <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.casillas, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
              <LabelTesis fontSize="30px" fontWeight="bold">Cree un cuestionario</LabelTesis>
            </Grid>
          </Grid>
        }
        <AddBar handleAdd={handleAdd}/>
      </Grid>
      <DialogTesis onHide={handleCloseNuevoCuestionario} visible={openNuevoCuestionario} title={esNuevo ? "Nuevo cuestionario" : "Editar cuestionario"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Nombre</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={nombreCuestionario} onBlur={handleNombreChange}/>
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
        </Grid>
        <Grid container sx={{marginTop:'10px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseNuevoCuestionario} sx={{outline:"auto"}} />
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

export default Cuestionarios