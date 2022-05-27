
import {Grid, MenuItem, Select, TextareaAutosize, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useContext, useEffect, useState} from "react";
import LabelTesis from "../components/LabelTesis";
import {PruebaUsabilidadContext} from "../context/PruebaContext";


const TareasRealizar = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [tareas,setTareas] = useState([]);

  const handleClickRegresar = () =>{
    history.push( "/visualizar-prueba-usabilidad");
  }

  useEffect(()=>{

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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Tareas</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {tareas.map((t,i)=>
          <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={12} sx={{alignSelf: 'center'}}>
              <LabelTesis fontSize="20px" fontWeight="bold">{`Tarea ${i+1}:`}</LabelTesis>
            </Grid>
            <Grid item xs={12}>
              <LabelTesis fontSize="14px" fontWeight="bold">{`${t.tarea}`}</LabelTesis>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  )

}

export default TareasRealizar