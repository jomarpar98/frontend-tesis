import {Grid, MenuItem, Select, TextareaAutosize, Typography, useTheme} from "@mui/material";
import {useHistory} from "react-router-dom";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from '@mui/icons-material/Add';
import React, {useContext, useEffect, useState} from "react";
import {getPerfiles} from "../services/PerfilService";
import LabelTesis from "../components/LabelTesis";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBar from "../components/AddBar";
import SaveIcon from "@mui/icons-material/Save";
import ButtonTesis from "../components/ButtonTesis";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {createTareas, getTareas} from "../services/TareaService";


const Tareas = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [tareas,setTareas] = useState([]);
  const [perfiles,setPerfiles] = useState([]);
  const [disable,setDisable] = useState(false);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState("noPerfiles");

  const tarea = {
    tarea: "",
    idPerfil: perfilSeleccionado,
  }

  const handleClickRegresar = () =>{
    history.push( "/visualizar-prueba-usabilidad");
  }

  const handleSelection = e => {
    const {name, value} = e.target;
    setPerfilSeleccionado(value)
  }

  const handleDelete = (i) => {
    setTareas(tareas.filter((t,index)=>index!==i))
  }

  const handleTareaChange = (e, i) => {
    tareas[i].tarea = e.target.value
    setTareas([...tareas]);
  }

  const handleAdd = () => {
    setTareas([...tareas,tarea]);
  }

  const handleGuardar = () => {
    createTareas(tareas,perfilSeleccionado)
  }

  useEffect(()=>{
    getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setPerfiles)
  },[])

  useEffect(()=>{
    getTareas(setTareas,perfilSeleccionado)
  },[perfilSeleccionado])

  useEffect(()=>{
    setPerfilSeleccionado(perfiles.length > 0 ? perfiles[0].idPerfilParticipante : "noPerfiles")
  },[perfiles])

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
      <Grid container sx={{marginTop:'10px', alignItems:'center'}}>
        <Grid item xs={1}>
          <LabelTesis fontSize={'20px'}>Perfil: </LabelTesis>
        </Grid>
        <Grid item xs={6}>
          <Select
            variant="outlined"
            value={perfilSeleccionado}
            onChange={handleSelection}
          >
            {perfiles.length === 0 && <MenuItem key={1} value={"noPerfiles"}>No hay perfiles</MenuItem>}
            {perfiles.map(perfil => (<MenuItem key={perfil.idPerfilParticipante} value={perfil.idPerfilParticipante}>{perfil.perfil}</MenuItem>))}
          </Select>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {tareas.map((t,i)=>
          <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={9} sx={{alignSelf: 'center'}}>
              <LabelTesis fontSize="20px" fontWeight="bold">{`Tarea ${i+1}:`}</LabelTesis>
            </Grid>
            <Grid item xs={3} sx={{textAlign: 'end'}}>
              <IconButtonTesis onClick={()=>{handleDelete(i)}}>
                <DeleteForeverIcon  />
              </IconButtonTesis>
            </Grid>
            <Grid item xs={12}>
              <textarea
                aria-label="tarea"
                value={t.tarea}
                onChange={(e)=>handleTareaChange(e,i)}
                placeholder="Ingrese una nueva tarea"
                style={{ width: '100%',resize: 'none',borderRadius:'5px',fontSize:'14px'}}
              />
            </Grid>
          </Grid>
        )}
        {tareas.length === 0 &&
        <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
          <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
            <LabelTesis fontSize="30px" fontWeight="bold">Cree una tarea</LabelTesis>
          </Grid>
        </Grid>
        }
        {perfiles.length > 0 ?
          <>
            <AddBar handleAdd={handleAdd}/>
            <Grid container>
              <Grid item xs={12} sx={{textAlign: 'end'}}>
                <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" disabled={disable} endIcon={<SaveIcon/>}/>
              </Grid>
            </Grid>
          </>
          :
          <Grid container xs={12} sx={{justifyContent: 'center',marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={5} sx={{alignSelf: 'center',textAlign: 'center'}}>
              <LabelTesis fontSize="30px" fontWeight="bold">Cree un perfil para crear tareas</LabelTesis>
            </Grid>
          </Grid>
        }
      </Grid>
    </Grid>
  )

}

export default Tareas