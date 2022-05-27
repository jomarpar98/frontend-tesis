import {Grid, Typography, useTheme} from "@mui/material";
import React, {useContext, useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelTesis from "../components/LabelTesis";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {UserContext} from "../context/UserContext";

const OpcionesPruebaUsabilidadAnalisis = () => {
  const theme = useTheme()
  const {pruebaUsabilidad,setPruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const {user} = useContext(UserContext)
  const history = useHistory()
  const[openEnlace,setOpenEnlace] = useState(false);
  const[enlace,setEnlace] = useState('');

  const handleClickRegresar = () =>{
    history.push('/pruebasUsabilidad')
  }

  const handleClickMiembros = () => {
    history.push("/observaciones-realizadas");
  }

  const hiddenFileInput = React.useRef(null);

  const handleOpen = () =>{
    hiddenFileInput.current.click();
  }

  const handleClickParticipantes = () => {
    history.push("/cuestionarios-realizados");
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>{`${pruebaUsabilidad.nombre}, Fase de Analisis:`}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
          <LabelTesis fontSize={"20px"} >Reporte realizado de la prueba:</LabelTesis>
          {user.idRol ===1 && pruebaUsabilidad.Miembros[0].esInvestigador &&
          <IconButtonTesis onClick={()=>{handleOpen()}}>
            <input type="file" ref={hiddenFileInput} style={{display: 'none'}} />
            <UploadFileIcon/>
          </IconButtonTesis>}
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <LabelTesis fontSize={"18px"} >{enlace.length > 0 ? enlace : "Todavia no se subido un reporte"}</LabelTesis>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickMiembros()}>
            <LabelTesis fontSize={"18px"} >Observaciones realizadas</LabelTesis>
          </div>
        </Grid>
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickParticipantes()}>
            <LabelTesis fontSize={"18px"} >Cuestionarios realizados</LabelTesis>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OpcionesPruebaUsabilidadAnalisis