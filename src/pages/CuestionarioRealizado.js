import {Grid, MenuItem, Radio, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LabelTesis from "../components/LabelTesis";
import DownloadIcon from '@mui/icons-material/Download';
import {createPreguntas, getPreguntas} from "../services/PreguntaService";

const tiposPregunta = [{idTipoPregunta:0,tipo:'Abierta'},{idTipoPregunta:1,tipo:'Selección Multiple'},
  {idTipoPregunta:2,tipo:'Selección Unica'},{idTipoPregunta:3,tipo:'Likert'}]



const CuestionarioRealizado = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const {idCuestionario,nombreCuestionario} = props.location.state;
  const [preguntas,setPreguntas] = useState([]);

  const handleClickRegresar = () =>{
    history.push("/cuestionarios-realizados");
  }

  const handlePreguntaChange = (e, i) => {
    preguntas[i].enunciado = e.target.value
    setPreguntas([...preguntas]);
  }

  useEffect(()=>{
    getPreguntas(setPreguntas,idCuestionario)
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>{nombreCuestionario}</Typography>
        </Grid>
        <Grid item>
          <IconButtonTesis>
            <DownloadIcon/>
          </IconButtonTesis>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',
        backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {preguntas.map((p,i)=>
          <>
            <Grid container xs={12} sx={{marginTop: '10px',marginBottom: '0px' ,
              backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px',
              borderBottomLeftRadius: '0',borderBottomRightRadius: '0'}}>
              <Grid item xs={12} sx={{alignSelf: 'center'}}>
                <LabelTesis fontSize="20px" fontWeight="bold">{`Pregunta ${i+1}:`}</LabelTesis>
              </Grid>
              <Grid item xs={12}>
              <textarea
                aria-label="pregunta"
                value={p.enunciado}
                readOnly={true}
                onChange={(e) => handlePreguntaChange(e, i)}
                placeholder="Ingrese una nueva pregunta"
                style={{width: '100%', resize: 'none',borderRadius:'5px',fontSize:'14px'}}
              />
              </Grid>
            </Grid>
            <Grid container xs={12} sx={{ marginBottom: '10px',backgroundColor: theme.palette.white, paddingLeft:'20px',paddingRight:'20px',
              borderRadius: '15px',borderTopLeftRadius:'0',borderTopRightRadius:'0'}}>
              <div style={{height: '80px'}}>

              </div>
            </Grid>
          </>
        )}
        {preguntas.length === 0 &&
        <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
          <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
            <LabelTesis fontSize="30px" fontWeight="bold">Cree una pregunta</LabelTesis>
          </Grid>
        </Grid>
        }
      </Grid>
    </Grid>
  )


}

export default CuestionarioRealizado