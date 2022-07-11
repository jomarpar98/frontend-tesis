import {Grid, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonTesis from "../components/ButtonTesis";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import DataGridTesis from "../components/DataGridTesis";
import {ColumnsParticipantes} from "../constants/ColumnsParticipantes.constant";
import React, {useContext, useEffect, useState} from "react";
import {ColumnsParticipantesComenzar} from "../constants/ColumnsParticipantesComenzar.constant";
import LabelTesis from "../components/LabelTesis";
import TexfieldTesis from "../components/TexfieldTesis";
import SaveIcon from "@mui/icons-material/Save";
import DialogTesis from "../components/DialogTesis";
import {getParticipantes, getParticipantesObservados} from "../services/ParticipanteService";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {ColumnsParticipantesObservar} from "../constants/ColumnsParticipantesObservar.constant";
import {UserContext} from "../context/UserContext";

const ParticipantesObservar = () => {
  const history = useHistory()
  const {user} = useContext(UserContext)
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [participantes,setParticipantes] = useState([])

  const handleClickRegresar = () =>{
    history.push("/ejecucion-miembro-prueba")
  }

  useEffect(()=>{
    getParticipantesObservados(setParticipantes,pruebaUsabilidad.idPruebaUsabilidad,user.idUsuario)
  },[])

  const handleClickObservaciones = (participante) => {
    history.push({
      pathname: "/fichaObservacion",
        search: '?query=abc',
        state: {
        participante: participante,
      }
    })
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
      <Grid xs={12} sx={{pt: 3}}>
        <DataGridTesis
          rows={participantes}
          columns={ColumnsParticipantesObservar(handleClickObservaciones)}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
        />
      </Grid>
    </Grid>
  )

}

export default ParticipantesObservar