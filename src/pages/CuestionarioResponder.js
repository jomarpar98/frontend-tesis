
import {FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LabelTesis from "../components/LabelTesis";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBar from "../components/AddBar";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CheckboxTesis from "../components/CheckboxTesis";
import TexfieldTesis from "../components/TexfieldTesis";
import DialogTesis from "../components/DialogTesis";
import {getPreguntas} from "../services/PreguntaService";
import {createRespuestas, getRespuestas} from "../services/RespuestaService";
import {UserContext} from "../context/UserContext";
import NotificationTesis from "../components/NotificationTesis";

const tiposPregunta = [{idTipoPregunta:0,tipo:'Abierta'},{idTipoPregunta:1,tipo:'Selección Multiple'},
  {idTipoPregunta:2,tipo:'Selección Unica'},{idTipoPregunta:3,tipo:'Likert'}]



const CuestionarioResponder = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const {idCuestionario,nombreCuestionario} = props.location.state;
  const [preguntas,setPreguntas] = useState([]);
  const [preguntasAux,setPreguntasAux] = useState([]);
  const {user} = useContext(UserContext)
  const [disable,setDisable] = useState(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})


  const handleClickRegresar = () =>{
    history.push("/cuestionarios-a-responder");
  }

  const handleGuardar = () => {
    let respuestas = []
    preguntasAux.map((p)=>{
      respuestas.push(...p.respuestas)
    })
    setDisable(true)
    setNotify({
      isOpen: true,
      message: 'Guardando Respuestas',
      type: 'info'})
    createRespuestas(preguntas,respuestas,user.idUsuario).then(()=>{
      setDisable(false)
      setNotify({
        isOpen: true,
        message: 'Respuestas guardadas correctamente',
        type: 'success'})
    })
  }

  const handleChangeAbierta = (value,i) =>{
    preguntasAux[i].respuestas[0].respuesta = value;
    setPreguntasAux([...preguntasAux])
  }

  const handleChangeUnica = (value,i) => {
    preguntasAux[i].respuestas[0].idAlternativa = parseInt(value);
    setPreguntasAux([...preguntasAux])
  }

  const handleChangeMultiple = (e,i)=> {
    if (e.target.checked) {
      preguntasAux[i].respuestas.push({idPregunta:preguntasAux[i].idPregunta, idParticipante: user.idUsuario, idAlternativa: parseInt(e.target.value)})
      setPreguntasAux([...preguntasAux])
    } else {
      preguntasAux[i].respuestas = preguntasAux[i].respuestas.filter((r)=>{return r.idAlternativa !== parseInt(e.target.value)})
      setPreguntasAux([...preguntasAux])
    }
  }

  const handleChecked = (idAlternativa,i) => {
    let checked = false
    preguntasAux[i].respuestas.map((r)=>{
      if(r.idAlternativa === idAlternativa) checked = true
    })
    return checked
  }

  useEffect(()=>{
    getPreguntas(setPreguntas,idCuestionario)
  },[])

  useEffect(()=>{
    getRespuestas(setPreguntasAux,preguntas,user.idUsuario)
  },[preguntas])

  useEffect(()=>{
    console.log(preguntasAux)
  },[preguntasAux])

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
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',
        backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {preguntasAux.map((p,i)=>
          <>
            <Grid container xs={12} sx={{marginTop: '10px',marginBottom: '0px' ,
              backgroundColor: theme.palette.primary.dark, padding: '10px',
              paddingLeft: '20px',paddingRight:'20px', borderRadius: '15px',
              borderBottomLeftRadius:'0',borderBottomRightRadius:'0'}}>
              <Grid item xs={12} sx={{alignSelf: 'center'}}>
                <LabelTesis fontSize="20px" fontWeight="bold">{`Pregunta ${i+1}:`}</LabelTesis>
              </Grid>
              <Grid item xs={12}>
                <LabelTesis fontSize="20px" >{p.enunciado}</LabelTesis>
              </Grid>
            </Grid>
            <Grid container xs={12} sx={{ marginBottom: '10px',backgroundColor: theme.palette.white, paddingLeft:'20px',paddingRight:'20px',
              borderRadius: '15px',borderTopLeftRadius:'0',borderTopRightRadius:'0'}}>
              {(p.idTipoPregunta === 0) &&
                <Grid item xs={12}>
                  <textarea
                    aria-label="abierta"
                    value={p.respuestas[0].respuesta}
                    onChange={(e)=>{handleChangeAbierta(e.target.value,i)}}
                    placeholder="Ingrese su respuesta"
                    style={{ width: '100%',resize: 'none',paddingTop:'10px',fontSize:'14px',border:'none',outline:'none'}}
                  />
                </Grid>
              }
              {(p.idTipoPregunta === 2 || p.idTipoPregunta === 3) &&
                <Grid container xs={12} sx={{ marginTop: '10px'}}>
                  <RadioGroup
                    value={p.respuestas[0]?.idAlternativa}
                    onChange={(e)=>{handleChangeUnica(e.target.value,i)}}
                  >
                    {p.alternativas.map((a,j)=><FormControlLabel value={a.idAlternativa} control={<Radio/>} label={a.alternativa}/>)}
                  </RadioGroup>
                </Grid>
              }
              {p.idTipoPregunta === 1 &&
                <Grid container xs={12} sx={{ marginTop: '10px'}}>
                  {p.alternativas.map((a,j)=>
                    <Grid item xs={12}>
                      <FormControlLabel control={<CheckboxTesis value={a.idAlternativa} checked={handleChecked(a.idAlternativa,i)} onChange={(e)=>handleChangeMultiple(e,i)} />} label={a.alternativa}/>
                    </Grid>)}
                </Grid>
              }
            </Grid>
          </>
        )}
        {preguntasAux.length === 0 ?
        <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
          <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
            <LabelTesis fontSize="30px" fontWeight="bold">No se definieron preguntas</LabelTesis>
          </Grid>
        </Grid> :
          <Grid container>
            <Grid item xs={12} sx={{textAlign: 'end'}}>
              <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" disabled={disable} endIcon={<SaveIcon/>}/>
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

export default CuestionarioResponder