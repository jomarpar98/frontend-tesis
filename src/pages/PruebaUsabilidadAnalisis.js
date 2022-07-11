import {Grid, Link, Typography, useTheme} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import IconButtonTesis from "../components/IconButtonTesis";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelTesis from "../components/LabelTesis";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {PruebaUsabilidadContext} from "../context/PruebaContext";
import {UserContext} from "../context/UserContext";
import {storage} from "../firebase"
import DownloadIcon from '@mui/icons-material/Download';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
import {getMiembro} from "../services/MiembroService";
import {getReporte, updateReporte} from "../services/PruebaUsabilidadService";
import NotificationTesis from "../components/NotificationTesis";

const OpcionesPruebaUsabilidadAnalisis = () => {
  const theme = useTheme()
  const {pruebaUsabilidad,setPruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const history = useHistory()
  const [inputValue,setInputValue] = useState('')
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [urlArch,setUrlArch] = useState('');
  const [nombreArch,setNombreArch] = useState('');

  const handleClickRegresar = () =>{
    history.push('/pruebasUsabilidad')
  }

  const handleClickObservaciones = () => {
    history.push("/observaciones-realizadas");
  }

  const hiddenFileInput = React.useRef(null);

  const handleOpen = () =>{
    hiddenFileInput.current.click();
  }

  const handleClickCuestionarios = () => {
    history.push("/cuestionarios-realizados");
  }

  const fileHandler = (e) =>{
    setNotify({
      isOpen: true,
      message: 'Subiendo reporte',
      type: 'info'})
    setInputValue(e.target)
    const name = `${e.target.files[0].name + '_' + v4()}`
    const pdfRef = ref(storage, `pdfs/${name}`)
    uploadBytes(pdfRef,e.target.files[0]).then((r)=>{
      updateReporte(name,pruebaUsabilidad.idPruebaUsabilidad).then(()=>{
        setNombreArch(name)
        setNotify({
          isOpen: true,
          message: 'Reporte subido correctamente',
          type: 'success'})
        }
      )
    })
    setInputValue('')
  }

  useEffect(()=>{
    getReporte(pruebaUsabilidad.idPruebaUsabilidad,setNombreArch)
  },[])

  useEffect(()=>{
    if(nombreArch.length > 0) {
      let referencia = ref(storage, `pdfs/${nombreArch}`)
      getDownloadURL(referencia).then((r)=>{
        setUrlArch(r)
      })
    }
  },[nombreArch])

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
          <Typography sx={{ fontWeight: '700', fontSize: '2.25rem',margin:2}}>{`${pruebaUsabilidad.nombre}, Fase de Análisis:`}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
          <LabelTesis fontSize={"20px"} >Reporte realizado de la prueba:</LabelTesis>
          <IconButtonTesis onClick={()=>{handleOpen()}}>
            <input type="file" ref={hiddenFileInput} value={inputValue} style={{display: 'none'}} onChange={(e)=>{fileHandler(e)}}/>
            <UploadFileIcon/>
          </IconButtonTesis>
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          {nombreArch.length>0 && urlArch.length>0 ?
            <Link href={urlArch} target="_blank" underline="hover" color="inherit">{nombreArch.split('_')[0]} <DownloadIcon sx={{verticalAlign : 'top'}}/></Link> :
            <LabelTesis fontSize={"18px"} >Todavia no se subido un reporte</LabelTesis>
          }
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pt:2}}>
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickObservaciones()}>
            <LabelTesis fontSize={"18px"} >Observaciones realizadas</LabelTesis>
          </div>
        </Grid>
        <Grid item xs={6} sx={{marginTop: '10px', marginBottom: '10px', padding: '20px'}}>
          <div style={{cursor:'pointer' ,backgroundColor: theme.palette.primary.dark,borderRadius: '15px',
            paddingTop: '50px', paddingLeft: '20px',height: '100px'}} onClick={()=>handleClickCuestionarios()}>
            <LabelTesis fontSize={"18px"} >Cuestionarios realizados</LabelTesis>
          </div>
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

export default OpcionesPruebaUsabilidadAnalisis