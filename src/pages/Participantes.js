import {Grid, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import ButtonTesis from "../components/ButtonTesis";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from '@mui/icons-material/Person';
import DataGridTesis from "../components/DataGridTesis";
import {ColumnsParticipantes} from "../constants/ColumnsParticipantes.constant";

const Participantes = (props) =>{
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

  const handleOpen = () => {

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
      <Grid container xs={12}>
        <Grid item xs={6}>
          <ButtonTesis label="Agregar participante" onClick={handleOpen} variant="contained" endIcon={<AddIcon/>}/>
        </Grid>
        <Grid item xs={6} sx={{textAlign: 'end'}}>
          <ButtonTesis label="Perfiles" onClick={handleOpen} variant="contained" endIcon={<PersonIcon/>}/>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <DataGridTesis
          rows={[]}
          columns={ColumnsParticipantes()}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
        />
      </Grid>
    </Grid>
  )

}

export default Participantes