import {Grid, MenuItem, Radio, Select, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
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
import {createPreguntas, getPreguntas} from "../services/PreguntaService";
import NotificationTesis from "../components/NotificationTesis";

const tiposPregunta = [{idTipoPregunta:0,tipo:'Abierta'},{idTipoPregunta:1,tipo:'Selección Multiple'},
  {idTipoPregunta:2,tipo:'Selección Unica'},{idTipoPregunta:3,tipo:'Likert'}]



const Cuestionario = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const {idCuestionario,nombreCuestionario} = props.location.state;
  const [preguntas,setPreguntas] = useState([]);
  const [tipoAgregar,setTipoAgregar] = useState(0);
  const [openNuevaPregunta,setOpenNuevaPregunta] = useState(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  const handleCloseNuevaPregunta = () => {
    setOpenNuevaPregunta(false);
  }

  const handleClickRegresar = () =>{
    history.push("/cuestionarios");
  }

  const handleDelete = (i) => {
    setPreguntas(preguntas.filter((t,index)=>index!==i))
  }

  const handlePreguntaChange = (e, i) => {
    preguntas[i].enunciado = e.target.value
    setPreguntas([...preguntas]);
  }

  const handleAdd = () => {
    setOpenNuevaPregunta(true);
    setTipoAgregar(tiposPregunta[0].idTipoPregunta);
  }

  const handleGuardar = () => {
    setNotify({
      isOpen: true,
      message: 'Guardando cuestionario',
      type: 'info'})
    createPreguntas(preguntas,idCuestionario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Cuestionario guardado correctamente',
        type: 'success'})
      getPreguntas(setPreguntas,idCuestionario)
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al guardar',
        type: 'error'})
    })
  }

  const handleAlternativaChange = (e,i,j) => {
    preguntas[i].alternativas[j].alternativa = e.target.value
    setPreguntas([...preguntas])
  }

  const handleAddAlternativa = (i) => {
    preguntas[i].alternativas = [...preguntas[i].alternativas,{alternativa: ''}]
    setPreguntas([...preguntas])
  }

  const handleDeleteAlternativa = (i,j) => {
    preguntas[i].alternativas = preguntas[i].alternativas.filter((a,index)=>index!==j)
    setPreguntas([...preguntas])
  }

  const handleSelection = (e) => {
    const {name, value} = e.target;
    setTipoAgregar(value)
  }

  const handleAgregar = () => {
    const pregunta = {
      enunciado: "",
      idTipoPregunta: tipoAgregar,
      idCuestionario: idCuestionario,
      alternativas: tipoAgregar===3 ? [{alternativa: 'Totalmente en desacuerdo'},{alternativa: 'En desacuerdo'},
        {alternativa: 'Indeciso'},{alternativa: 'De acuerdo'},{alternativa: 'Totalmente de acuerdo'}]
        : [{
        alternativa: ''
      }]
    }
    setPreguntas([...preguntas,pregunta])
    setOpenNuevaPregunta(false);
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
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',
        backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {preguntas.map((p,i)=>
          <>
          <Grid container xs={12} sx={{marginTop: '10px',marginBottom: p.idTipoPregunta === 0 ? '10px':'0px' ,
            backgroundColor: theme.palette.primary.dark, padding: '10px',
            paddingLeft: '20px',paddingRight:'20px', borderRadius: '15px',
            borderBottomLeftRadius:p.idTipoPregunta === 0 ? '15px':'0',borderBottomRightRadius:p.idTipoPregunta === 0 ? '15px':'0'}}>
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
                defaultValue={p.enunciado}
                onBlur={(e) => handlePreguntaChange(e, i)}
                placeholder="Ingrese una nueva pregunta"
                style={{width: '100%', resize: 'none',borderRadius:'5px',fontSize:'14px'}}
              />
            </Grid>
          </Grid>
          { p.idTipoPregunta !== 0 &&
            <Grid container xs={12} sx={{ marginBottom: '10px',backgroundColor: theme.palette.white, paddingLeft:'20px',paddingRight:'20px',
              borderRadius: '15px',borderTopLeftRadius:'0',borderTopRightRadius:'0'}}>
              {p.alternativas.map((a,j)=>
                <Grid container xs={12} sx={{ marginTop: '10px'}}>
                  <Grid item xs={1} sx={{alignSelf: 'center'}}>
                    {p.idTipoPregunta === 1 && <CheckboxTesis disabled/>}
                    {(p.idTipoPregunta === 2 || p.idTipoPregunta === 3) && <Radio disabled/>}
                  </Grid>
                  <Grid item xs={10} sx={{alignSelf: 'center'}}>
                    <TexfieldTesis size="small" variant="outlined" sx={{width:'100%'}} defaultValue={a.alternativa} onBlur={(e)=>handleAlternativaChange(e,i,j)}/>
                  </Grid>
                  <Grid item xs={1} sx={{textAlign: 'center', alignSelf: 'center'}}>
                    <IconButtonTesis onClick={()=>{handleDeleteAlternativa(i,j)}}>
                      <DeleteForeverIcon  />
                    </IconButtonTesis>
                  </Grid>
                </Grid>
              )}
              {<Grid item xs={1} sx={{textAlign: "start",marginTop: '10px', marginBottom:'10px'}}>
                <IconButtonTesis onClick={()=>{handleAddAlternativa(i)}} sx={{border: 'dotted'}}>
                  <AddIcon/>
                </IconButtonTesis>
              </Grid>}
            </Grid>
          }
          </>
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
            <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" endIcon={<SaveIcon/>}/>
          </Grid>
        </Grid>
      </Grid>
      <DialogTesis onHide={handleCloseNuevaPregunta} visible={openNuevaPregunta} title={"Nueva Pregunta"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Tipo de pregunta</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <Select
              variant="outlined"
              defaultValue={tiposPregunta.length > 0 ? tiposPregunta[0].idTipoPregunta : "noTipos"}
              onChange={handleSelection}
              sx={{width:'100%'}}
            >
              {tiposPregunta.length === 0 && <MenuItem key={1} value={"noTipos"}>No hay tipos</MenuItem>}
              {tiposPregunta.map(tipo => (<MenuItem key={tipo.idTipoPregunta} value={tipo.idTipoPregunta}>{tipo.tipo}</MenuItem>))}
            </Select>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop:'10px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseNuevaPregunta} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Agregar" onClick={handleAgregar} variant="contained" endIcon={<AddIcon/>}/>
          </Grid>
        </Grid>
      </DialogTesis>
      <NotificationTesis
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Grid>
  )


}

export default Cuestionario