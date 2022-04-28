import React, {useContext, useEffect, useState} from "react";
import {Grid, InputAdornment, Typography, useTheme} from "@mui/material";
import TexfieldTesis from "../components/TexfieldTesis";
import {Search} from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SaveIcon from '@mui/icons-material/Save';
import LabelTesis from "../components/LabelTesis";
import IconButtonTesis from "../components/IconButtonTesis";
import {format} from "date-fns";
import ButtonTesis from "../components/ButtonTesis";
import DialogTesis from "../components/DialogTesis";
import {UserContext} from "../context/UserContext";
import {
  createPruebaUsabilidad,
  deletePruebaUsabilidad,
  getPruebasUsabilidad
} from "../services/PruebasUsabilidadService";
import {useHistory} from "react-router-dom";

let prueba = {
  nombre: "ejemplo",
  software: "pruebasis.com",
  creacion: format(new Date(),"dd/MM/yyyy"),
  responsable: "juan",
  enlace: 'a.com'
}
let arr = [];
arr.push(prueba);
arr.push(prueba);

const PruebasUsabilidad = () => {

  const[pruebas,setPruebas] = useState([]);
  const[nombre,setNombre] = useState('');
  const[software,setSoftware] = useState('');
  const[enlace,setEnlace] = useState('');
  const[esNuevo,setEsNuevo] = useState(true);
  const[disable,setDisable] = useState(false);
  const[openNuevaPrueba,setOpenNuevaPrueba] = useState(false);
  const history = useHistory();

  const {user} = useContext(UserContext);

  const theme = useTheme()

  const handleCloseNuevaPrueba = () => {
    setOpenNuevaPrueba(false);
  }

  const handleOpen = (nuevo,prueba = {}) => {
    setEsNuevo(nuevo)
    if (nuevo) {
      setSoftware('')
      setEnlace('')
      setNombre('')
    } else {
      setNombre(prueba.nombre)
      setEnlace(prueba.enlace)
      setSoftware(prueba.software)
    }
    setOpenNuevaPrueba(true);
  }

  const handleNombreChange = (e) => {
    setNombre(e.target.value)
  }

  const handleEnlaceChange = (e) => {
    setEnlace(e.target.value)
  }

  const handleSoftwareChange = (e) => {
    setSoftware(e.target.value)
  }

  const handleGuardar = () =>{
    setDisable(true)
    createPruebaUsabilidad(nombre,enlace,software,user.idUsuario).then(()=>
      window.location.reload()
    )
  }

  const handleDelete = (prueba) => {
    deletePruebaUsabilidad(prueba.idPruebaUsabilidad).then(()=>
      window.location.reload()
    )
  }

  const handleNext = (prueba) => {
    history.push({
      pathname: "/visualizar-prueba-usabilidad",
      search: '?query=abc',
      state: {
        idPrueba: prueba.idPruebaUsabilidad,
        nombrePrueba: prueba.nombre,
      }
    });
  }


  useEffect(()=>{
    getPruebasUsabilidad(user,setPruebas)
  },[])
  return (
    <Grid width={'80%'} m="auto" sx={{mt: 5}}>
      <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2,textAlign: 'center'}}>Pruebas de Usabilidad</Typography>
      <Grid container>
        <Grid item xs={10}>
          <TexfieldTesis
            variant="outlined"
            placeholder="Buscar por nombre"
            InputProps={{ startAdornment:  ( <InputAdornment position="start"> <Search /> </InputAdornment> )}}
          />
        </Grid>
        <Grid item xs={2} sx={{textAlign: 'end'}}>
          <ButtonTesis label="Nueva prueba" variant="contained" onClick={()=>handleOpen(true)} endIcon={<AddIcon/>} />
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {pruebas.map((prueba,i) =>
          <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={9}>
              <LabelTesis fontSize="20px" fontWeight="bold">{prueba.nombre}</LabelTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>handleOpen(false,prueba)}>
                <EditIcon/>
              </IconButtonTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>handleDelete(prueba)}>
                <DeleteForeverIcon/>
              </IconButtonTesis>
            </Grid>
            <Grid item xs={1}>
              <IconButtonTesis onClick={()=>handleNext(prueba)}>
                <NavigateNextIcon/>
              </IconButtonTesis>
            </Grid>
            <Grid item xs={3}>
              <LabelTesis>{`Creado: ${prueba.creacion? format(new Date(prueba.creacion),"dd/MM/yyyy") : '' }`}</LabelTesis>
            </Grid>
            <Grid item xs={3}>
              <LabelTesis>{`Responsable: ${prueba.responsable.nombre} ${prueba.responsable.apPaterno} ${prueba.responsable.apMaterno}`}</LabelTesis>
            </Grid>
            <Grid item xs={4}>
              <LabelTesis>{`Software evaluado: ${prueba.software}`}</LabelTesis>
            </Grid>
          </Grid>
        )}
      </Grid>
      <DialogTesis onHide={handleCloseNuevaPrueba} visible={openNuevaPrueba} title={esNuevo ? "Nueva prueba de usabilidad" : "Editar prueba de usabilidad"}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Nombre</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={nombre} onBlur={handleNombreChange}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Nombre del software</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={software} onBlur={handleSoftwareChange}/>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Enlace</LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <TexfieldTesis  variant="outlined" sx={{width:'100%'}} defaultValue={enlace} onBlur={handleEnlaceChange}/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}>
            <ButtonTesis label="Cancelar" onClick={handleCloseNuevaPrueba} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={3} sx={{textAlign: 'end'}}>
            <ButtonTesis label="Guardar" onClick={handleGuardar} variant="contained" disabled={disable} endIcon={<SaveIcon/>}/>
          </Grid>
        </Grid>
      </DialogTesis>
    </Grid>
  )
}

export default PruebasUsabilidad;