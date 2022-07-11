import {Grid, Typography, useTheme} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelTesis from "../components/LabelTesis";
import EditIcon from "@mui/icons-material/Edit";
import TexfieldTesis from "../components/TexfieldTesis";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DialogTesis from "../components/DialogTesis";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {UserContext} from "../context/UserContext";
import {updatePruebaUsabilidad} from "../services/PruebaUsabilidadService";
import {getOneParticipante, updateParticipantes} from "../services/ParticipanteService";
import NotificationTesis from "../components/NotificationTesis";

const OpcionesPruebaUsabilidad = () => {
  const theme = useTheme()
  const {pruebaUsabilidad,setPruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const {user} = useContext(UserContext)
  const history = useHistory()
  const[openEnlace,setOpenEnlace] = useState(false);
  const[enlace,setEnlace] = useState(pruebaUsabilidad.eVideoconfe? pruebaUsabilidad.eVideoconfe: '');
  const[disable,setDisable] = useState(false);
  const[participante,setParticipante] = useState({});
  const[openConsentimiento,setOpenConsentimiento] = useState(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  useEffect(()=>{
    if (user.idRol===3){
      getOneParticipante(setParticipante,pruebaUsabilidad.idPruebaUsabilidad,user.idUsuario)
    }
  },[])

  useEffect(()=>{
    if (Object.keys(participante).length !== 0) {
      if (!participante?.consentimiento) setOpenConsentimiento(true)
    }
  },[participante])

  const handleClickRegresar = () =>{
    history.push('/pruebasUsabilidad')
  }

  const handleChangeEnlace = (e) => {
    setEnlace(e.target.value)
  }

  const handleClickMiembros = () => {
    history.push("/miembros");
  }

  const handleGuardar = () => {
    setDisable(true)
    updatePruebaUsabilidad(pruebaUsabilidad.nombre,pruebaUsabilidad.eSistema,pruebaUsabilidad.software,
      pruebaUsabilidad.idCreador,pruebaUsabilidad.idPruebaUsabilidad,enlace).then(()=>{
        pruebaUsabilidad.eVideoconfe = enlace;
        setPruebaUsabilidad(pruebaUsabilidad);
        window.location.reload()
    })
  }

  const handleOpen = () =>{
    setOpenEnlace(true)
  }

  const handleClickParticipantes = () => {
    history.push("/participantes");
  }

  const handleClickCuestionarios = () => {
    if(user.idRol === 1) {
      history.push("/cuestionarios");
    }else{
      history.push("/cuestionarios-a-responder")
    }
  }

  const handleClickTareas = () => {
    if (user.idRol===3){
      history.push('/tareas-a-realizar')
    } else
    history.push("/tareas");
  }

  const handleClickEntrevista = () => {
    history.push("/entrevista");
  }

  const handleCloseEnlace = () => {
    setOpenEnlace(false);
  }

  const handleAceptar = () =>{
    participante.consentimiento = 1
    updateParticipantes(participante).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Consentimiento aceptado',
        type: 'success'})
      setOpenConsentimiento(false)
    })
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>{user.idRol ===1 ? pruebaUsabilidad.nombre + ', Fase de Planeación:' : pruebaUsabilidad.nombre}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
          <LabelTesis fontSize={"20px"} >Enlace de videoconferencia de la prueba:</LabelTesis>
          {user.idRol ===1 && <IconButtonTesis onClick={()=>{handleOpen()}}>
            <EditIcon/>
          </IconButtonTesis>}
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <LabelTesis fontSize={"18px"} >{enlace.length > 0 ? enlace : "Todavia no se a definido un enlace de videoconferencia para la prueba"}</LabelTesis>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        {user.idRol ===1 &&
        <Grid item xs={4} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickMiembros()}>
            <LabelTesis fontSize={"18px"} >Miembros de la prueba</LabelTesis>
          </div>
        </Grid>}
        {user.idRol ===1 &&
        <Grid item xs={4} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickParticipantes()}>
            <LabelTesis fontSize={"18px"} >Participantes</LabelTesis>
          </div>
        </Grid>}
        <Grid item xs={user.idRol === 1 ? 4: 6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickCuestionarios()}>
            <LabelTesis fontSize={"18px"} >Cuestionarios</LabelTesis>
          </div>
        </Grid>
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickTareas()}>
            <LabelTesis fontSize={"18px"} >{user.idRol ===3 ? "Tareas a realizar" : "Tareas"}</LabelTesis>
          </div>
        </Grid>
        {user.idRol ===1 &&
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickEntrevista()}>
            <LabelTesis fontSize={"18px"} >Estructura de entrevista</LabelTesis>
          </div>
        </Grid>}
      </Grid>
      <DialogTesis onHide={handleCloseEnlace} visible={openEnlace} title={"Enlace de videoconferencia"}>
        <Grid container>
          <Grid item xs={12} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Ingrese el enlace de las videoconferencias:</LabelTesis>
          </Grid>
          <Grid item xs={12} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={enlace} onBlur={handleChangeEnlace}/>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop: '20px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseEnlace} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" disabled={disable} endIcon={<SaveIcon/>}/>
          </Grid>
        </Grid>
      </DialogTesis>
      <DialogTesis visible={openConsentimiento} title={"Consentimiento del participante"}>
        <Grid container>
          <Grid item xs={12} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>{`Yo, ${participante?.Usuario?.nombre} ${participante?.Usuario?.apPaterno} ${participante?.Usuario?.apMaterno} ` +
              `ACEPTO participar en esta prueba de usabilidad. Entiendo que al oprimir el boton "Aceptar" estoy de acuerdo con las siguientes condiciones.`
            }</LabelTesis>
            <LabelTesis style={{marginTop:'15px'}}>
              {`Entiendo que se evaluara un sistema de software, no mis capacidades/habilidades/conocimientos`}
            </LabelTesis>
            <LabelTesis style={{marginTop:'15px'}}>
              {`Entiendo que los resultados del experimento se utilizaran sólo para propósitos académicos y/o de investigación, sin que mi identidad sea revelada.`}
            </LabelTesis>
            <LabelTesis style={{marginTop:'15px'}}>
              {`Entiendo que puedo comunicar al supervisor del experimento, en cualquier momento, sobre algún ` +
              `malestar, molestia o inconformidad que pueda sentir durante el desarrollo del experimento; y que por tal ` +
              `motivo, puedo abandonar el experimento y el laboratorio en cualquier momento.`}
            </LabelTesis>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop: '20px'}}>
          <Grid item xs={12} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Aceptar" onClick={handleAceptar} variant="contained" endIcon={<ThumbUpAltIcon/>}/>
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

export default OpcionesPruebaUsabilidad