import {Grid, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelTesis from "../components/LabelTesis";
import EditIcon from "@mui/icons-material/Edit";
import TexfieldTesis from "../components/TexfieldTesis";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import DialogTesis from "../components/DialogTesis";

const OpcionesPruebaUsabilidad = (props) => {
  const theme = useTheme()
  const {idPrueba,nombrePrueba} = props.location.state;
  const history = useHistory()
  const[openEnlace,setOpenEnlace] = useState(false);
  const[enlace,setEnlace] = useState('');
  const[disable,setDisable] = useState(false);

  const handleClickRegresar = () =>{
    history.push('/pruebasUsabilidad')
  }

  const handleChangeEnlace = (e) => {
    setEnlace(e.target.value)
  }

  const handleClickMiembros = () => {
    history.push({
      pathname: "/miembros",
      search: '?query=abc',
      state: {
        idPrueba: idPrueba,
        nombre: nombrePrueba,
      }
    });
  }

  const handleGuardar = () => {
    setDisable(true)
  }

  const handleOpen = () =>{
    setOpenEnlace(true)
  }

  const handleClickParticipantes = () => {
    history.push({
      pathname: "/participantes",
      search: '?query=abc',
      state: {
        idPrueba: idPrueba,
        nombre: nombrePrueba,
      }
    });
  }

  const handleClickCuestionarios = () => {
    history.push({
      pathname: "/cuestionarios",
      search: '?query=abc',
      state: {
        idPrueba: idPrueba,
        nombre: nombrePrueba,
      }
    });
  }

  const handleClickTareas = () => {
    history.push({
      pathname: "/tareas",
      search: '?query=abc',
      state: {
        idPrueba: idPrueba,
        nombre: nombrePrueba,
      }
    });
  }

  const handleClickEntrevista = () => {
    history.push({
      pathname: "/entrevista",
      search: '?query=abc',
      state: {
        idPrueba: idPrueba,
        nombre: nombrePrueba,
      }
    });
  }

  const handleCloseEnlace = () => {
    setOpenEnlace(false);
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>{nombrePrueba}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:4}}>
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
          <LabelTesis fontSize={"20px"} >Enlace de videoconferencia de la prueba:</LabelTesis>
          <IconButtonTesis onClick={()=>{handleOpen()}}>
            <EditIcon/>
          </IconButtonTesis>
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <LabelTesis fontSize={"18px"} >Todavia no se a definido un enlace de zoom para la prueba</LabelTesis>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:4}}>
        <Grid item xs={4} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '120px'}} onClick={()=>handleClickMiembros()}>
            <LabelTesis fontSize={"18px"} >Miembros de la prueba</LabelTesis>
          </div>
        </Grid>
        <Grid item xs={4} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '120px'}} onClick={()=>handleClickParticipantes()}>
            <LabelTesis fontSize={"18px"} >Participantes</LabelTesis>
          </div>
        </Grid>
        <Grid item xs={4} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '120px'}} onClick={()=>handleClickCuestionarios()}>
            <LabelTesis fontSize={"18px"} >Cuestionarios</LabelTesis>
          </div>
        </Grid>
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '120px'}} onClick={()=>handleClickTareas()}>
            <LabelTesis fontSize={"18px"} >Tareas a realizar</LabelTesis>
          </div>
        </Grid>
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '120px'}} onClick={()=>handleClickEntrevista()}>
            <LabelTesis fontSize={"18px"} >Estructura de entrevista</LabelTesis>
          </div>
        </Grid>
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
    </Grid>
  )
}

export default OpcionesPruebaUsabilidad