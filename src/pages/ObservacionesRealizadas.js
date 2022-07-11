import {Grid, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonTesis from "../components/ButtonTesis";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import DataGridTesis from "../components/DataGridTesis";
import {ColumnsParticipantes} from "../constants/ColumnsParticipantes.constant";
import React, {useContext, useEffect, useState} from "react";
import {ColumnsParticipantesComenzar} from "../constants/ColumnsParticipantesComenzar.constant";
import LabelTesis from "../components/LabelTesis";
import TexfieldTesis from "../components/TexfieldTesis";
import SaveIcon from "@mui/icons-material/Save";
import DialogTesis from "../components/DialogTesis";
import {getParticipantes, getParticipantesObservados} from "../services/ParticipanteService";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {ColumnsParticipantesObservar} from "../constants/ColumnsParticipantesObservar.constant";
import {UserContext} from "../context/UserContext";
import {ColumnsParticipantesAnalisis} from "../constants/ColumnsParticipantesAnalisis.constant";
import {getExcelTareasObservaciones} from "../services/TareaService";
import NotificationTesis from "../components/NotificationTesis";

const ObservacionesRealizadas = () => {
  const history = useHistory()
  const {user} = useContext(UserContext)
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [participantes,setParticipantes] = useState([])
  const [openEnlace,setOpenEnlace] = useState(false);
  const [grabacionPrueba,setGrabacionPrueba] = useState('');
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [grabacionEntrevista,setGrabacionEntrevista] = useState('');

  const handleClickRegresar = () =>{
    history.push("/analisis-prueba-usabilidad")
  }

  const handleOpen = (participante) =>{
    setGrabacionEntrevista(participante.gravacionEntrevista ? participante.gravacionEntrevista : '')
    setGrabacionPrueba(participante.gravacionPrueba ? participante.gravacionPrueba : '')
    setOpenEnlace(true)
  }

  const handleCloseEnlace = () => {
    setOpenEnlace(false);
  }

  useEffect(()=>{
    getParticipantes(setParticipantes,pruebaUsabilidad.idPruebaUsabilidad)
  },[])

  const handleClickObservaciones = (participante) => {
    history.push({
      pathname: "/visualizar-observaciones",
      search: '?query=abc',
      state: {
        participante: participante,
      }
    })
  }

  const handleClickDescargar = (participante) => {
    setNotify({
      isOpen: true,
      message: 'Descargando',
      type: 'info'})
    getExcelTareasObservaciones(participante.PerfilParticipante.idPerfilParticipante,participante.idUsuario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Excel descargado correctamente',
        type: 'success'})
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Participantes</Typography>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <DataGridTesis
          rows={participantes}
          columns={ColumnsParticipantesAnalisis(handleClickObservaciones,handleOpen,handleClickDescargar)}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
        />
      </Grid>
      <DialogTesis onHide={handleCloseEnlace} visible={openEnlace} title={"Grabaciones"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Prueba de usabilidad:</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>{grabacionPrueba.length > 0 ? grabacionPrueba.length : 'No hay grabación'}</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Entrevista:</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>{grabacionEntrevista.length > 0 ? grabacionEntrevista.length : 'No hay grabación'}</LabelTesis>
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

export default ObservacionesRealizadas