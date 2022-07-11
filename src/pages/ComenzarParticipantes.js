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
import {getParticipantes, updateParticipantes} from "../services/ParticipanteService";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {comenzarPrueba} from "../services/PruebaUsabilidadService";
import NotificationTesis from "../components/NotificationTesis";

const ComenzarParticipantes = () => {
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [participantes,setParticipantes] = useState([])

  const [openEnlace,setOpenEnlace] = useState(false);
  const [grabacionPrueba,setGrabacionPrueba] = useState('');
  const [grabacionEntrevista,setGrabacionEntrevista] = useState('');
  const [participanteSelect, setParticipanteSelect] = useState({});
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  const handleOpen = (participante) => {
    setGrabacionEntrevista(participante.gravacionEntrevista ? participante.gravacionEntrevista : '')
    setGrabacionPrueba(participante.gravacionPrueba ? participante.gravacionPrueba : '')
    setParticipanteSelect(participante)
    setOpenEnlace(true)
  }

  const handleComenzar = (participante) => {
    setNotify({
      isOpen: true,
      message: 'Enviando correo',
      type: 'info'})
    comenzarPrueba(pruebaUsabilidad.idPruebaUsabilidad,participante.Usuario.email,participante.idUsuario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Correo enviado correctamente',
        type: 'success'})
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al enviar correo',
        type: 'error'})
    })
  }

  const handleClickRegresar = () =>{
    history.push("/ejecucion-miembro-prueba")
  }

  const handleCloseEnlace = () => {
    setOpenEnlace(false);
  }

  const handleGuardar = () => {
    participanteSelect.gravacionEntrevista = grabacionEntrevista
    participanteSelect.gravacionPrueba = grabacionPrueba
    setNotify({
      isOpen: true,
      message: 'Guardando enlaces',
      type: 'info'})
    updateParticipantes(participanteSelect).then(()=>{
      setTimeout(()=>{
        setNotify({
          isOpen: true,
          message: 'Enlaces guardados correctamente',
          type: 'success'})
        getParticipantes(setParticipantes,pruebaUsabilidad.idPruebaUsabilidad)
      },2000)
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al guardar',
        type: 'error'})
    })
  }

  useEffect(()=>{
    getParticipantes(setParticipantes,pruebaUsabilidad.idPruebaUsabilidad)
  },[])

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
          columns={ColumnsParticipantesComenzar(handleOpen,handleComenzar)}
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
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={grabacionPrueba} onBlur={(e)=>{setGrabacionPrueba(e.target.value)}}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Entrevista:</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={grabacionEntrevista} onBlur={(e)=>{setGrabacionEntrevista(e.target.value)}}/>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop: '20px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseEnlace} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={()=>{handleGuardar()}} variant="contained" endIcon={<SaveIcon/>}/>
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

export default ComenzarParticipantes