import {Grid, MenuItem, Radio, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LabelTesis from "../components/LabelTesis";
import DownloadIcon from '@mui/icons-material/Download';
import {Paper} from '@material-ui/core';
import {Bar} from 'react-chartjs-2';
import {Chart as CharJS} from 'chart.js/auto'
import {getExcelPreguntasRespuestas, getPreguntasRespuestas} from "../services/PreguntaService";
import NotificationTesis from "../components/NotificationTesis";

const CuestionarioRealizado = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const {idCuestionario,nombreCuestionario} = props.location.state;
  const [preguntas,setPreguntas] = useState([]);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  const handleClickRegresar = () =>{
    history.push("/cuestionarios-realizados");
  }

  const handleClickDescargar = () => {
    setNotify({
      isOpen: true,
      message: 'Descargando',
      type: 'info'})
    getExcelPreguntasRespuestas(idCuestionario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Excel descargado correctamente',
        type: 'success'})
    })
  }

  useEffect(()=>{
    getPreguntasRespuestas(setPreguntas,idCuestionario)
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
          <IconButtonTesis onClick={handleClickDescargar}>
            <DownloadIcon/>
          </IconButtonTesis>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',
        backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {preguntas.map((p,i)=>
          <>
            <Grid container xs={12} sx={{marginTop: '10px',marginBottom: '0px' ,
              backgroundColor: theme.palette.primary.dark, padding: '10px',
              paddingLeft: '20px',paddingRight:'20px', borderRadius: '15px',
              borderBottomLeftRadius: '0',borderBottomRightRadius: '0'}}>
              <Grid item xs={12} sx={{alignSelf: 'center'}}>
                <LabelTesis fontSize="20px" fontWeight="bold">{`Pregunta ${i+1}:`}</LabelTesis>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12} sx={{alignSelf: 'center'}}>
                  <LabelTesis fontSize="18px" >{p.enunciado}</LabelTesis>
                </Grid>
              </Grid>
            </Grid>
            <Grid container xs={12} sx={{ marginBottom: '10px',backgroundColor: theme.palette.white, paddingLeft:'20px',paddingRight:'20px',
              borderRadius: '15px',borderTopLeftRadius:'0',borderTopRightRadius:'0'}}>
              {p.idTipoPregunta === 0 && p.Respuesta.map((r,i)=>
                <Grid container sx={{ marginBottom: '10px',marginTop:'10px',backgroundColor: theme.palette.gris, paddingLeft:'20px',paddingRight:'20px',
                  borderRadius: '15px'}}>
                  <LabelTesis>{r.respuesta}</LabelTesis>
                </Grid>
              )}
              {p.idTipoPregunta !== 0 &&
                  <Bar
                    type={'bar'}
                    data={p.alternativas}
                    height={400}
                    width={600}
                    options={{
                      maintainAspectRatio: false,
                    }}
                   />
              }
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
      <NotificationTesis
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Grid>
  )


}

export default CuestionarioRealizado