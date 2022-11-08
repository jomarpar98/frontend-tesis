
import {Grid, MenuItem, Select, TextareaAutosize, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useContext, useEffect, useState} from "react";
import LabelTesis from "../components/LabelTesis";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import {getOneParticipante} from "../services/ParticipanteService";
import {UserContext} from "../context/UserContext";
import {getTareas} from "../services/TareaService";


const TareasRealizar = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const {user} = useContext(UserContext)
  const [participante, setParticipante] = useState({});
  const [tareas,setTareas] = useState([]);

  const handleClickRegresar = () =>{
    history.push( "/visualizar-prueba-usabilidad");
  }

  useEffect(()=>{
    getOneParticipante(setParticipante,pruebaUsabilidad.idPruebaUsabilidad,user.idUsuario)
  },[])

  useEffect(()=>{
    if(participante?.consentimiento) {
      getTareas(setTareas, participante?.PerfilParticipante?.idPerfilParticipante)
    }
  },[participante])

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
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {tareas.map((t,i)=>
          <>
            <Grid container xs={12} sx={{marginTop: '10px',backgroundColor: theme.palette.casillas, padding: '10px',
              paddingLeft: '20px',paddingRight:'20px', borderRadius: '15px'}}>
              <Grid item xs={12} sx={{alignSelf: 'center'}}>
                <LabelTesis fontSize="20px" fontWeight="bold">{`Tarea ${i+1}:`}</LabelTesis>
              </Grid>
              <Grid item xs={12} sx={{alignSelf: 'center'}}>
                <LabelTesis fontSize="20px" >{t.tarea}</LabelTesis>
              </Grid>
            </Grid>
          </>
        )}
        {tareas.length === 0 &&
          <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.casillas, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
              <LabelTesis fontSize="30px" fontWeight="bold">No se definieron tareas</LabelTesis>
            </Grid>
          </Grid>
        }
      </Grid>
    </Grid>
  )

}

export default TareasRealizar