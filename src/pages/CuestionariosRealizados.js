import {Grid, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useContext, useEffect, useState} from "react";
import LabelTesis from "../components/LabelTesis";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {format} from "date-fns";
import AddBar from "../components/AddBar";
import TexfieldTesis from "../components/TexfieldTesis";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import DialogTesis from "../components/DialogTesis";
import {createPruebaUsabilidad} from "../services/PruebaUsabilidadService";
import {getPerfiles} from "../services/PerfilService";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {UserContext} from "../context/UserContext";
import {
  createCuestionario,
  deleteCuestionario,
  getCuestionarios,
  updateCuestionario
} from "../services/CuestionarioService";

const CuestionariosRealizados = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [recordsFiltered, setRecordsFiltered] = useState([]);

  const handleClickRegresar = () =>{
    history.push("/analisis-prueba-usabilidad");
  }

  const handleNext = (cuestionario) => {
    history.push({
      pathname: "/visualizar-cuestionario-realizado",
      search: '?query=abc',
      state: {
        idCuestionario: cuestionario.idCuestionario,
        nombreCuestionario: cuestionario.nombre,
      }
    });
  }

  useEffect(()=>{
    getCuestionarios(setRecordsFiltered,pruebaUsabilidad.idPruebaUsabilidad)
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Cuestionarios</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {recordsFiltered.map((cuestionario,i) =>
          <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={11}>
              <LabelTesis fontSize="20px" fontWeight="bold">{cuestionario.nombre}</LabelTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>handleNext(cuestionario)}>
                <NavigateNextIcon/>
              </IconButtonTesis>
            </Grid>
            <Grid item xs={5}>
              <LabelTesis>{`Perfil del participante: ${cuestionario.PerfilParticipante.perfil}`}</LabelTesis>
            </Grid>
            <Grid item xs={4}>
              <LabelTesis>{`Numero de preguntas: ${cuestionario.preguntas}`}</LabelTesis>
            </Grid>
          </Grid>
        )}
        {recordsFiltered.length === 0 &&
        <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
          <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
            <LabelTesis fontSize="30px" fontWeight="bold">No hay cuestionarios</LabelTesis>
          </Grid>
        </Grid>
        }
      </Grid>
    </Grid>
  )

}

export default CuestionariosRealizados