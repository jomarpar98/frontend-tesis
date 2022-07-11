import {Grid, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useContext, useEffect, useState} from "react";
import LabelTesis from "../components/LabelTesis";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBar from "../components/AddBar";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {createEntrevista, getEntrevista} from "../services/PreguntaService";
import NotificationTesis from "../components/NotificationTesis";

const Entrevista = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [preguntas,setPreguntas] = useState([]);
  const [disable,setDisable] = useState(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})


  const pregunta = {
    enunciado: "",
    idTipoPregunta: 1,
  }

  const handleClickRegresar = () =>{
    history.push("/visualizar-prueba-usabilidad");
  }

  const handleDelete = (i) => {
    setPreguntas(preguntas.filter((t,index)=>index!==i))
  }

  const handlePreguntaChange = (e, i) => {
    preguntas[i].enunciado = e.target.value
    setPreguntas([...preguntas]);
  }

  const handleAdd = () => {
    setPreguntas([...preguntas,pregunta]);
  }

  const handleGuardar = () => {
    setNotify({
      isOpen: true,
      message: 'Guardando entrevista',
      type: 'info'})
    createEntrevista(preguntas,pruebaUsabilidad.idPruebaUsabilidad).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Entrevista guardada correctamente',
        type: 'success'})
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al guardar',
        type: 'error'})
    })
  }

  useEffect(()=>{
    getEntrevista(setPreguntas,pruebaUsabilidad.idPruebaUsabilidad)
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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Estructura de la entrevista</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {preguntas.map((p,i)=>
          <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '10px',
            paddingLeft: '20px',paddingRight:'20px', borderRadius: '15px'}}>
            <Grid item xs={9} sx={{alignSelf: 'center'}}>
              <LabelTesis fontSize="20px" fontWeight="bold">{`Pregunta ${i+1}:`}</LabelTesis>
            </Grid>
            <Grid item xs={3} sx={{textAlign: 'end'}}>
              <IconButtonTesis onClick={()=>{handleDelete(i)}}>
                <DeleteForeverIcon  />
              </IconButtonTesis>
            </Grid>
            <Grid item xs={12}>
              <textarea
                aria-label="pregunta"
                value={p.enunciado}
                onChange={(e)=>handlePreguntaChange(e,i)}
                placeholder="Ingrese una nueva pregunta"
                style={{ width: '100%',resize: 'none',borderRadius:'5px',fontSize:'14px' }}
              />
            </Grid>
          </Grid>
        )}
        {preguntas.length === 0 &&
        <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
          <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
            <LabelTesis fontSize="30px" fontWeight="bold">Cree una pregunta</LabelTesis>
          </Grid>
        </Grid>
        }
        <AddBar handleAdd={handleAdd}/>
        <Grid container>
          <Grid item xs={12} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" disabled={disable} endIcon={<SaveIcon/>}/>
          </Grid>
        </Grid>
      </Grid>
      <NotificationTesis
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Grid>
  )

}

export default Entrevista