import {Grid, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {createTareas, getTareas} from "../services/TareaService";
import {getPerfiles} from "../services/PerfilService";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LabelTesis from "../components/LabelTesis";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBar from "../components/AddBar";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import {createPreguntas} from "../services/PreguntaService";
import {UserContext} from "../context/UserContext";
import {createObservaciones, getObservaciones} from "../services/ObservacionService";
import NotificationTesis from "../components/NotificationTesis";

const FichaObservacion = (props) =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const {user} = useContext(UserContext)
  const [tareas,setTareas] = useState([]);
  const [observaciones, setObservaciones] = useState([]);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const {participante} = props.location.state;

  const handleClickRegresar = () =>{
    history.push( "/participantes-observar");
  }

  const handleGuardar = () => {
    let idTareas = []
    tareas.forEach((t)=>{
      idTareas.push(t.idTarea)
    })
    setNotify({
      isOpen: true,
      message: 'Guardando observaciones',
      type: 'info'})
    createObservaciones({observaciones: observaciones, idTareas: idTareas},participante.idUsuario,user.idUsuario).then(
      ()=>{
        setNotify({
          isOpen: true,
          message: 'Observaciones guardadas correctamente',
          type: 'success'})
      }
    ).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al guardar',
        type: 'error'})
    })
  }

  const observacionChange = (value,i) => {
    observaciones[i].observacion = value
    setObservaciones([...observaciones])
  }

  useEffect(()=>{
    getObservaciones(setObservaciones,participante.idUsuario,user.idUsuario,pruebaUsabilidad.idPruebaUsabilidad).then(
      getTareas(setTareas,participante.PerfilParticipante.idPerfilParticipante)
    )
  },[])

  useEffect(()=>{
    if(tareas.length > 0){
      if(observaciones.length === 0) {
        let aux = tareas.map((t)=>{
          return {
            idParticipante : participante.idUsuario,
            idObservador : user.idUsuario,
            idTarea : t.idTarea,
            observacion : '',
          }
        })
        setObservaciones(aux)
      }
    }
  },[tareas])

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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Tareas</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{marginTop:'10px', alignItems:'center'}}>
        <Grid item xs={6} >
          <LabelTesis fontSize={'20px'}>{`Participante: ${participante.Usuario.nombre} ${participante.Usuario.apPaterno} ${participante.Usuario.apMaterno}`} </LabelTesis>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {tareas.map((t,i)=>
          <>
            <Grid container xs={12} sx={{marginTop: '10px',backgroundColor: theme.palette.primary.dark, padding: '10px',
              paddingLeft: '20px',paddingRight:'20px', borderRadius: '15px'
              ,borderBottomLeftRadius: '0px',borderBottomRightRadius: '0px'}}>
              <Grid item xs={12} sx={{alignSelf: 'center'}}>
                <LabelTesis fontSize="20px" fontWeight="bold">{`Tarea ${i+1}:`}</LabelTesis>
              </Grid>
              <Grid item xs={12} sx={{alignSelf: 'center'}}>
                <LabelTesis fontSize="18px" >{t.tarea}</LabelTesis>
              </Grid>
            </Grid>
            <Grid container xs={12} sx={{ marginBottom: '10px',backgroundColor: theme.palette.white, paddingLeft:'20px',paddingRight:'20px',
            borderRadius: '15px',borderTopLeftRadius:'0',borderTopRightRadius:'0'}}>
              <Grid item xs={12}>
                <textarea
                  aria-label="observacion"
                  value={observaciones.length > 0 ? observaciones[i].observacion : ''}
                  onChange={(e)=>{observacionChange(e.target.value,i)}}
                  placeholder="Ingrese sus observaciones"
                  style={{ width: '100%',resize: 'none',paddingTop:'10px',fontSize:'14px',border:'none',outline:'none'}}
                />
              </Grid>
            </Grid>
          </>
        )}
        {tareas.length === 0 ?
          <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
              <LabelTesis fontSize="30px" fontWeight="bold">No se definieron tareas</LabelTesis>
            </Grid>
          </Grid> :
          <Grid container>
            <Grid item xs={12} sx={{textAlign: 'end'}}>
              <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" endIcon={<SaveIcon/>}/>
            </Grid>
          </Grid>
        }
      </Grid>
      <NotificationTesis
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Grid>
  )
}

export default FichaObservacion