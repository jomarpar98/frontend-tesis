import {Grid, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useEffect, useState} from "react";
import {getPerfiles} from "../services/PerfilService";

const Tareas = (props) =>{
  const theme = useTheme()
  const history = useHistory()
  const {idPrueba,nombre} = props.location.state;
  const [tareas,setTareas] = useState([]);
  const [perfiles,setPerfiles] = useState([]);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState({});

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

  const handleSelection = e => {
    const {name, value} = e.target;
    setPerfilSeleccionado(value)
  }

  useEffect(()=>{
    getPerfiles(idPrueba,setPerfilSeleccionado,setPerfiles)
  },[])

  useEffect(()=>{

  },[perfilSeleccionado])

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
      <Grid container>
        <Grid item xs={6}>
          <Select
            variant="outlined"
            defaultValue={perfiles.length > 0 ? perfiles[0] : null}
            onChange={handleSelection}
          >
            {perfiles.map(perfil => (<MenuItem key={perfil.idPerfilParticipante} value={perfil.idPerfilParticipante}>{perfil.perfil}</MenuItem>))}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  )

}

export default Tareas