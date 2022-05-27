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

const Cuestionarios = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const [recordsFiltered, setRecordsFiltered] = useState([]);
  const[openNuevoCuestionario,setOpenNuevoCuestionario] = useState(false);
  const[esNuevo,setEsNuevo] = useState(true);
  const[disable,setDisable] = useState(false);
  const[nombreCuestionario,setNombreCuestionario] = useState('');
  const [perfiles,setPerfiles] = useState([]);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState("noPerfiles");
  const [idSeleccionado,setIdSeleccionado] = useState(null);
  const [fetch,setFetch] = useState(false);

  const handleClickRegresar = () =>{
    history.push("/visualizar-prueba-usabilidad");
  }

  const handleNombreChange = (e) => {
    setNombreCuestionario(e.target.value)
  }

  const handleCloseNuevoCuestionario = () => {
    setOpenNuevoCuestionario(false);
  }

  const handleOpen = (nuevo,cuestionario = {}) => {
    setEsNuevo(nuevo)
    if (nuevo) {
      setNombreCuestionario('')
      setPerfilSeleccionado(perfiles.length > 0 ? perfiles[0].idPerfilParticipante:"noPerfiles")
    } else {
      setIdSeleccionado(cuestionario.idCuestionario)
      setNombreCuestionario(cuestionario.nombre)
      setPerfilSeleccionado(cuestionario.idPerfil)
    }
    setOpenNuevoCuestionario(true);
  }

  const handleDelete = (cuestionario) => {
    deleteCuestionario(cuestionario.idCuestionario).then(()=>{
      setFetch(!fetch)
    })
  }

  const handleNext = (cuestionario) => {
    history.push({
      pathname: "/visaulizar-cuestionario",
      search: '?query=abc',
      state: {
        idCuestionario: cuestionario.idCuestionario,
        nombreCuestionario: cuestionario.nombre,
      }
    });
  }

  const handleAdd = () => {
    handleOpen(true)
  }

  const handleGuardar = () => {
    setDisable(true)
    let cuestionario = {
      nombre : nombreCuestionario,
      esEntrevista: 0,
      esTareas: 0,
      idPerfil: perfilSeleccionado,
    }
    if(idSeleccionado !== null) {cuestionario.idCuestionario = idSeleccionado}
    if (esNuevo) {
      createCuestionario(cuestionario).then(()=>{
        setDisable(false)
        setFetch(!fetch)
      })
    } else {
      updateCuestionario(cuestionario).then(()=>{
        setDisable(false)
        setFetch(!fetch)
      })
    }
    setOpenNuevoCuestionario(false)
  }

  const handleSelection = e => {
    const {name, value} = e.target;
    setPerfilSeleccionado(value)
  }

  useEffect(()=>{
    getPerfiles(pruebaUsabilidad.idPruebaUsabilidad,setPerfiles)
    getCuestionarios(setRecordsFiltered,pruebaUsabilidad.idPruebaUsabilidad)
  },[fetch])

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
            <Grid item xs={9}>
              <LabelTesis fontSize="20px" fontWeight="bold">{cuestionario.nombre}</LabelTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>handleOpen(false,cuestionario)}>
                <EditIcon/>
                </IconButtonTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>handleDelete(cuestionario)}>
                <DeleteForeverIcon/>
              </IconButtonTesis>
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
              <LabelTesis fontSize="30px" fontWeight="bold">Cree un cuestionario</LabelTesis>
            </Grid>
          </Grid>
        }
        <AddBar handleAdd={handleAdd}/>
      </Grid>
      <DialogTesis onHide={handleCloseNuevoCuestionario} visible={openNuevoCuestionario} title={esNuevo ? "Nuevo cuestionario" : "Editar cuestionario"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Nombre</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={nombreCuestionario} onBlur={handleNombreChange}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Perfil</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <Select
              variant="outlined"
              defaultValue={perfilSeleccionado}
              onChange={handleSelection}
              sx={{width:'100%'}}
            >
              {perfiles.length === 0 && <MenuItem key={1} value={"noPerfiles"}>No hay perfiles</MenuItem>}
              {perfiles.map(perfil => (<MenuItem key={perfil.idPerfilParticipante} value={perfil.idPerfilParticipante}>{perfil.perfil}</MenuItem>))}
            </Select>
          </Grid>
        </Grid>
        <Grid container sx={{marginTop:'10px'}}>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseNuevoCuestionario} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" disabled={disable} endIcon={<SaveIcon/>}/>
          </Grid>
        </Grid>
      </DialogTesis>
    </Grid>
  )

}

export default Cuestionarios