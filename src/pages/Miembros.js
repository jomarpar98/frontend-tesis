import {Grid, InputAdornment, MenuItem, Select, Typography, useTheme} from "@mui/material";
import IconButtonTesis from "../components/IconButtonTesis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import DataGridTesis from "../components/DataGridTesis";
import {ColumnsMiembros} from "../constants/ColumnsMiembros.constant";
import ButtonTesis from "../components/ButtonTesis";
import AddIcon from '@mui/icons-material/Add';
import LabelTesis from "../components/LabelTesis";
import TexfieldTesis from "../components/TexfieldTesis";
import SaveIcon from "@mui/icons-material/Save";
import DialogTesis from "../components/DialogTesis";
import {Search} from "@material-ui/icons";
import {ColumnsAgregarMiembros} from "../constants/ColumnsAgregarMiembros.constant";
import {deleteMiembro, getMiembros, createMiembros, updateMiembro} from "../services/MiembroService";
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {UserContext} from "../context/UserContext";
import {getDisponibles} from "../services/UsuarioService";
import {createPruebaUsabilidad, updatePruebaUsabilidad} from "../services/PruebaUsabilidadService";
import CheckboxTesis from "../components/CheckboxTesis";
import NotificationTesis from "../components/NotificationTesis";

const Miembros = () =>{
  const theme = useTheme()
  const history = useHistory()
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const {user} = useContext(UserContext)
  const [miembros,setMiembros] = useState([])
  const [disponibles,setDisponibles] = useState([])
  const [openNuevoMiembro,setOpenNuevoMiembro] = useState(false);
  const [openTipos,setOpenTipos] = useState(false);
  const [recordsFiltered, setRecordsFiltered] = useState([]);
  const [miembrosAgregar,setMiembrosAgregar] = useState([]);
  const [disable,setDisable] = useState(false);
  const [esNuevo,setEsNuevo] = useState(true);
  const [esInvestigador, setEsInvestigador] = useState(false);
  const [esObservador, setEsObservador] = useState(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [idUsuarioSelected, setIdUsuarioSelected] = useState(null);
  const [fetchMiembros,setFetchMiembros] = useState(false);

  const handleClickRegresar = () =>{
    history.push( "/visualizar-prueba-usabilidad");
  }

  const handleCloseNuevoMiembro = () =>{
    setOpenNuevoMiembro(false)
  }

  const handleCloseTipos = () =>{
    setOpenTipos(false)
  }

  const handleOpen = () => {
    setOpenNuevoMiembro(true)
  }

  const handleAgregarMiembro = () => {
    let porAgregar = []
    setNotify({
      isOpen: true,
      message: 'Agregando miembros',
      type: 'info'})
    miembrosAgregar.map((m)=>{
      let miembro = {
        idPruebaUsabilidad: pruebaUsabilidad.idPruebaUsabilidad,
        idUsuario: m,
      }
      porAgregar.push(miembro)
    })
    setOpenNuevoMiembro(false)
    createMiembros(porAgregar).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Miembro agregado correctamente',
        type: 'success'})
      setFetchMiembros(!fetchMiembros)
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al agregar',
        type: 'error'})
    })
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    let filtered
    if (value === "")
      filtered = disponibles;
    else
      filtered = disponibles.filter(x => `${x.nombre}${x.apPaterno}${x.apMaterno}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  const handleDelete = (miembro) =>{
    setNotify({
      isOpen: true,
      message: 'Eliminando miembro',
      type: 'info'})
    deleteMiembro(pruebaUsabilidad.idPruebaUsabilidad,miembro.idUsuario).then(()=>{
      setNotify({
        isOpen: true,
        message: 'Miembro eliminado correctamente',
        type: 'success'})
      setFetchMiembros(!fetchMiembros)
    }).catch(()=>{
      setNotify({
        isOpen: true,
        message: 'Error al eliminar',
        type: 'error'})
    })
  }

  const handleOpenTipos = (nuevo,miembro = {}) =>{
    setEsNuevo(nuevo)
    if(nuevo){
      setEsObservador(false)
      setEsInvestigador(false)
    } else {
      setEsObservador(miembro.esObservador)
      setEsInvestigador(miembro.esInvestigador)
      setIdUsuarioSelected(miembro.idUsuario)
    }
    setOpenTipos(true)
  }

  const handleGuardar = () =>{
    setDisable(true)
    if(esNuevo){
      // En caso se use al momento de crear
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Actualizando miembro',
        type: 'info'})
      let actualizarMiembro = {
        idPruebaUsabilidad: pruebaUsabilidad.idPruebaUsabilidad,
        idUsuario: idUsuarioSelected,
        esObservador: esObservador,
        esInvestigador: esInvestigador,
      }
      updateMiembro(actualizarMiembro).then(()=>{
        setNotify({
          isOpen: true,
          message: 'Miembro actualizado correctamente',
          type: 'success'})
        getMiembros(setMiembros,pruebaUsabilidad.idPruebaUsabilidad)
        setFetchMiembros(!fetchMiembros)
        setOpenTipos(false)
        setDisable(false)
      }).catch(()=>{
        setNotify({
          isOpen: true,
          message: 'Error al actualizar',
          type: 'error'})
      })
    }
  }

  useEffect(()=>{
    getDisponibles(setRecordsFiltered,pruebaUsabilidad.idPruebaUsabilidad,user.idUsuario)
    getDisponibles(setDisponibles,pruebaUsabilidad.idPruebaUsabilidad,user.idUsuario)
    getMiembros(setMiembros,pruebaUsabilidad.idPruebaUsabilidad)
  },[fetchMiembros])

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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>Miembros de la prueba</Typography>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <ButtonTesis label="Agregar miembro" onClick={handleOpen} variant="contained" endIcon={<AddIcon/>}/>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <DataGridTesis
          rows={miembros.length > 0 ? miembros : []}
          columns={ColumnsMiembros(handleDelete,handleOpenTipos)}
          disableSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          disableColumnMenu
        />
      </Grid>
      <DialogTesis onHide={handleCloseNuevoMiembro} visible={openNuevoMiembro} title={"Usuarios disponibles"}>
        <Grid container>
          <Grid item xs={5}>
            <TexfieldTesis
              variant="outlined"
              placeholder="Buscar por nombre"
              InputProps={{ startAdornment:  ( <InputAdornment position="start"> <Search /> </InputAdornment> )}}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={7} sx={{textAlign: 'end',alignSelf:'center'}}>
            <ButtonTesis label="Agregar miembros" variant="contained" onClick={()=>handleAgregarMiembro()} endIcon={<AddIcon/>} />
          </Grid>
        </Grid>
        <Grid xs={12} sx={{pt: 3}}>
          <DataGridTesis
            rows={ recordsFiltered.length!==0 ? recordsFiltered :[]}
            columns={ColumnsAgregarMiembros()}
            onSelectionModelChange={setMiembrosAgregar}
            disableSelectionOnClick
            disableColumnSelector
            disableColumnFilter
            disableColumnMenu
            checkboxSelection
          />
        </Grid>
      </DialogTesis>
      <DialogTesis onHide={handleCloseTipos} visible={openTipos} title={"Tipo de miembro"} width={'fitContent'}>
        <Grid container>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Investigador: </LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center',textAlign: 'end'}}>
            <CheckboxTesis
              name="EsInvestigador"
              checked={esInvestigador}
              onChange={(e)=>{
                setEsInvestigador(e.target.checked)
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center'}}>
            <LabelTesis>Observador: </LabelTesis>
          </Grid>
          <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', alignSelf: 'center',textAlign: 'end'}}>
            <CheckboxTesis
              name="EsObservador"
              checked={esObservador}
              onChange={(e)=>{
                setEsObservador(e.target.checked)
              }}
            />
          </Grid>
        </Grid>
        <Grid container sx={{marginTop:'10px'}}>
          <Grid item xs={6}>
            <ButtonTesis label="Cancelar" onClick={handleCloseTipos} sx={{outline:"auto"}} />
          </Grid>
          <Grid item xs={6} sx={{textAlign: 'end'}}>
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

export default Miembros