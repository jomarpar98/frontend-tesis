import {Grid, Typography, useTheme} from "@mui/material";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {useHistory} from "react-router-dom";
import DataGridTesis from "../components/DataGridTesis";
import {ColumnsMiembros} from "../constants/ColumnsMiembros.constant";
import ButtonTesis from "../components/ButtonTesis";
import AddIcon from '@mui/icons-material/Add';

const Miembros = (props) =>{
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Miembros de la prueba</Typography>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <ButtonTesis label="Agregar miembro" onClick={handleOpen} variant="contained" endIcon={<AddIcon/>}/>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <DataGridTesis
          rows={[{
            nombre: 'Juan',
            ap_paterno: 'Pareja',
            ap_materno: 'Gutierrez',
            rol: 'Investigador',
            correo_electronico: 'correo@gmail',
            id: 1
          },
            {
              nombre: 'Andres',
              ap_paterno: 'Pareja',
              ap_materno: 'Gutierrez',
              rol: 'Investigador',
              correo_electronico: 'correo@gmail',
              id: 2
            }
          ]}
          columns={ColumnsMiembros()}
          disableSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          disableColumnMenu
        />
      </Grid>
    </Grid>
  )

}

export default Miembros