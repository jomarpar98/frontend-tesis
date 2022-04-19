import React, {useEffect, useState} from "react";
import {Grid, InputAdornment, Typography, useTheme} from "@mui/material";
import TexfieldTesis from "../components/TexfieldTesis";
import {Search} from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LabelTesis from "../components/LabelTesis";
import IconButtonTesis from "../components/IconButtonTesis";

let prueba = {
  nombre: "ejemplo",
  software: "pruebasis.com",
  creacion: Date(),
  responsable: "juan"
}
let arr = [];
arr.push(prueba);
arr.push(prueba);

const PruebasUsabilidad = () => {

  const[pruebas,setPruebas] = useState([]);

  const theme = useTheme()

  useEffect(()=>{
    setPruebas(arr);
  },[])
  return (
    <Grid width={'80%'} m="auto" sx={{mt: 5}}>
      <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2,textAlign: 'center'}}>Pruebas de Usabilidad</Typography>
      <TexfieldTesis
        variant="outlined"
        placeholder="Buscar por nombre"
        InputProps={{ startAdornment:  ( <InputAdornment position="start"> <Search /> </InputAdornment> )}}
      />
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {pruebas.map((prueba,i) =>
          <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={10}>
              <LabelTesis>{prueba.nombre}</LabelTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>{}}>
                <EditIcon/>
              </IconButtonTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>{}}>
                <DeleteForeverIcon/>
              </IconButtonTesis>
            </Grid>
            <Grid item xs={3}>
              <LabelTesis>{`Creado: ${prueba.creacion}`}</LabelTesis>
            </Grid>
            <Grid item xs={3}>
              <LabelTesis>{`Responsable: ${prueba.responsable}`}</LabelTesis>
            </Grid>
            <Grid item xs={4}>
              <LabelTesis>{`Software evaluado: ${prueba.software}`}</LabelTesis>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default PruebasUsabilidad;