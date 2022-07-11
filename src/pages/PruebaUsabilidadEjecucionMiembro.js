import {Grid, Typography, useTheme} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelTesis from "../components/LabelTesis";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {UserContext} from "../context/UserContext";
import {getMiembro} from "../services/MiembroService";

const OpcionesMiembroPruebaUsabilidad = () => {
  const theme = useTheme()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const {user} = useContext(UserContext)
  const history = useHistory()
  const [enlace,setEnlace] = useState(pruebaUsabilidad.eVideoconfe? pruebaUsabilidad.eVideoconfe: '');
  const [miembro,setMiembro] = useState({})

  const handleClickRegresar = () =>{
    history.push('/pruebasUsabilidad')
  }

  const handleClickComenzar = () => {
    history.push("/comenzar-prueba");
  }

  const handleClickObservaciones = () => {
    history.push("/participantes-observar");
  }

  useEffect(()=>{
    getMiembro(setMiembro,pruebaUsabilidad.idPruebaUsabilidad,user.idUsuario)
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>{`${pruebaUsabilidad.nombre}, Fase de Ejecución:`}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
          <LabelTesis fontSize={"20px"} >Enlace de videoconferencia de la prueba:</LabelTesis>
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <LabelTesis fontSize={"18px"} >{enlace.length > 0 ? enlace : "Todavia no se a definido un enlace de videoconferencia para la prueba"}</LabelTesis>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        {(miembro.esInvestigador === 1) &&
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickComenzar()}>
            <LabelTesis fontSize={"18px"} >Comenzar prueba</LabelTesis>
          </div>
        </Grid>}
        {(miembro.esObservador === 1) && <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickObservaciones()}>
            <LabelTesis fontSize={"18px"} >Ficha de observación</LabelTesis>
          </div>
        </Grid>}
      </Grid>
    </Grid>
  )
}

export default OpcionesMiembroPruebaUsabilidad