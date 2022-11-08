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
import {getMiembro} from "../services/MiembroService";
import NotificationTesis from "../components/NotificationTesis";

const PruebasUsabilidad = () => {

  const [pruebas,setPruebas] = useState([]);
  const [nombre,setNombre] = useState('');
  const [software,setSoftware] = useState('');
  const [enlace,setEnlace] = useState('');
  const [idSelect,setIdSelect] = useState(null);
  const [esNuevo,setEsNuevo] = useState(true);
  const [disable,setDisable] = useState(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [openNuevaPrueba,setOpenNuevaPrueba] = useState(false);
  const [recordsFiltered, setRecordsFiltered] = useState([]);
  const history = useHistory();

  const {user} = useContext(UserContext);
  const {setPruebaUsabilidad} = useContext(PruebaUsabilidadContext);

  const theme = useTheme()

  const handleCloseNuevaPrueba = () => {
    setOpenNuevaPrueba(false);
  }

  const handleOpen = (nuevo,prueba = {},e) => {
    setEsNuevo(nuevo)
    if (nuevo) {
      setSoftware('')
      setEnlace('')
      setNombre('')
    } else {
      e.stopPropagation()
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
      setNotify({
        isOpen: true,
        message: 'Creando prueba',
        type: 'info'})
      createPruebaUsabilidad(nombre,enlace,software,user.idUsuario).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Prueba creada correctamente',
          type: 'success'})
        getPruebasUsabilidad(user,setPruebas)
        getPruebasUsabilidad(user,setRecordsFiltered)
        setDisable(false)
        setOpenNuevaPrueba(false)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al crear',
          type: 'error'})
        setDisable(false)
        setOpenNuevaPrueba(false)
      })
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Actualizando prueba',
        type: 'info'})
      updatePruebaUsabilidad(nombre,enlace,software,user.idUsuario,idSelect).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Prueba actualizada correctamente',
          type: 'success'})
        getPruebasUsabilidad(user,setPruebas)
        getPruebasUsabilidad(user,setRecordsFiltered)
        setDisable(false)
        setOpenNuevaPrueba(false)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al actualizar',
          type: 'error'})
        setDisable(false)
        setOpenNuevaPrueba(false)
      })
    }
  }

  const handleDelete = (prueba,e) => {
    e.stopPropagation()
    setNotify({
      isOpen: true,
      message: 'Eliminando prueba',
      type: 'info'})
    deletePruebaUsabilidad(prueba.idPruebaUsabilidad).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Prueba eliminada correctamente',
        type: 'success'})
      getPruebasUsabilidad(user,setPruebas)
      getPruebasUsabilidad(user,setRecordsFiltered)
      setDisable(false)
      setOpenNuevaPrueba(false)
      }
    ).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al eliminar',
        type: 'error'})
      setDisable(false)
      setOpenNuevaPrueba(false)
    })
  }

  const handleNext = async (prueba) => {
    setPruebaUsabilidad(prueba)
    let miembro
    await getMiembro((m)=>{miembro=m},prueba.idPruebaUsabilidad,user.idUsuario)
    if (miembro?.esObservador === 1 && miembro?.esInvestigador === 0) {
      history.push("/ejecucion-miembro-prueba");
    }
    else {
      history.push("/visualizar-prueba-usabilidad");
    }
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
          <ButtonTesis label="Nueva prueba" variant="contained" onClick={(e)=>handleOpen(true,e)} endIcon={<AddIcon/>} />
        </Grid>
        }
      </Grid>
      <Grid container justifyContent='space-between' sx={{marginTop: '30px', marginBottom: '10px',backgroundColor: theme.palette.fondo,borderRadius: '15px', padding: '20px'}}>
        {recordsFiltered.map((prueba,i) =>
          <Grid onClick={()=>handleNext(prueba)} container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.casillas, padding: '10px',
            paddingLeft: '20px',paddingRight:'20px', borderRadius: '15px'}}>
            <Grid item xs={user.idRol === 1 ? 10:12}>
              <LabelTesis fontSize="20px" fontWeight="bold">{prueba.nombre}</LabelTesis>
            </Grid>
            {user.idRol === 1 &&
              <>
                <Grid item xs={1}>
                  <IconButtonTesis onClick={(e)=>handleOpen(false,prueba,e)}>
                    <EditIcon/>
                  </IconButtonTesis>
                </Grid>
                <Grid item xs={1}>
                  <IconButtonTesis onClick={(e)=>handleDelete(prueba,e)}>
                    <DeleteForeverIcon/>
                  </IconButtonTesis>
                </Grid>
              </>
            }
            <Grid item xs={2}>
              <LabelTesis>{`Creado: ${prueba.creacion? format(new Date(prueba.creacion),"dd/MM/yyyy") : '' }`}</LabelTesis>
            </Grid>
            <Grid item xs={5}>
              <LabelTesis>{`Responsable: ${prueba.responsable.nombre} ${prueba.responsable.apPaterno} ${prueba.responsable.apMaterno}`}</LabelTesis>
            </Grid>
            <Grid item xs={3}>
              <LabelTesis>{`Software evaluado: ${prueba.software}`}</LabelTesis>
            </Grid>
          </Grid>
        )}
        {recordsFiltered.length === 0 &&
        <Grid container xs={12} sx={{marginTop: '10px', marginBottom: '10px',backgroundColor: theme.palette.casillas, padding: '20px', borderRadius: '15px',justifyContent: 'center'}}>
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
      <NotificationTesis
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Grid>
  )
}

export default PruebasUsabilidad;