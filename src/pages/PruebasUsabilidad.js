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
  getPruebasUsabilidad, updatePruebaUsabilidad
} from "../services/PruebaUsabilidadService";
import {useHistory} from "react-router-dom";
import {PruebaUsabilidadContext} from "../context/PruebaContext";

const PruebasUsabilidad = () => {

  const[pruebas,setPruebas] = useState([]);
  const[nombre,setNombre] = useState('');
  const[software,setSoftware] = useState('');
  const[enlace,setEnlace] = useState('');
  const[idSelect,setIdSelect] = useState(null);
  const[esNuevo,setEsNuevo] = useState(true);
  const[disable,setDisable] = useState(false);
  const[openNuevaPrueba,setOpenNuevaPrueba] = useState(false);
  const [recordsFiltered, setRecordsFiltered] = useState([]);
  const history = useHistory();

  const {user} = useContext(UserContext);
  const {setPruebaUsabilidad} = useContext(PruebaUsabilidadContext);

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
      setIdSelect(prueba.idPruebaUsabilidad)
      setNombre(prueba.nombre)
      setEnlace(prueba.eSistema)
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
    if(esNuevo){
      createPruebaUsabilidad(nombre,enlace,software,user.idUsuario).then(()=>
        window.location.reload()
      )
    }
    else {
      updatePruebaUsabilidad(nombre,enlace,software,user.idUsuario,idSelect).then(()=>
        window.location.reload()
      )
    }
  }

  const handleDelete = (prueba) => {
    deletePruebaUsabilidad(prueba.idPruebaUsabilidad).then(()=>
      window.location.reload()
    )
  }

  const handleNext = (prueba) => {
    setPruebaUsabilidad(prueba)
    history.push("/visualizar-prueba-usabilidad");
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    let filtered
    if (value === "")
      filtered = pruebas;
    else
      filtered = pruebas.filter(x => `${x.nombre}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }


  useEffect(()=>{
    getPruebasUsabilidad(user,setPruebas)
    getPruebasUsabilidad(user,setRecordsFiltered)
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
            onChange={handleSearch}
          />
        </Grid>
        {user.idRol === 1 &&
        <Grid item xs={2} sx={{textAlign: 'end',alignSelf:'center'}}>
          <ButtonTesis label="Nueva prueba" variant="contained" onClick={()=>handleOpen(true)} endIcon={<AddIcon/>} />
        </Grid>
        }
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {recordsFiltered.map((prueba,i) =>
          <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px'}}>
            <Grid item xs={user.idRol === 1 ? 9:11}>
              <LabelTesis fontSize="20px" fontWeight="bold">{prueba.nombre}</LabelTesis>
            </Grid>
            {user.idRol === 1 &&
              <>
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
              </>
            }
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
        {recordsFiltered.length === 0 &&
        <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.primary.dark, padding: '20px', borderRadius: '15px',justifyContent: 'center'}}>
          <LabelTesis fontSize="30px" fontWeight="bold">No se encuentra ninguna prueba</LabelTesis>
        </Grid>}
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
        <Grid container sx={{marginTop:'10px'}}>
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