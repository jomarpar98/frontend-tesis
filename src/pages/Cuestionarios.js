import {Grid, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";

const Cuestionarios = (props) =>{
  const theme = useTheme()
  const history = useHistory()
  const {idPrueba,nombre} = props.location.state;

  const handleClickRegresar = () =>{
    history.push({
      pathname: "/visualizar-prueba-usabilidad",
      search: '?query=abc',
      state: {
        idPrueba: idPrueba,
        nombrePrueba: nombre,
      }
    });
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Cuestionarios</Typography>
        </Grid>
      </Grid>
    </Grid>
  )

}

export default Cuestionarios