import GoogleLoginButton from '../components/GoogleLoginButton';
import Typography from '@mui/material/Typography';
import { LoginBackground, LoginContainer, Logo } from '../styles/Login.style';
import {Grid, useTheme} from "@mui/material";
import TexfieldTesis from "../components/TexfieldTesis";
import React, {useContext, useState} from "react";
import ButtonTesis from "../components/ButtonTesis";
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import url from "../Config";
import axios from "axios";
import {UserContext} from "../context/UserContext";
import {useHistory} from "react-router-dom";

const Login = (props) => {

  const [correo,setCorreo] = useState('')
  const [contra,setContra] = useState('')
  const history = useHistory()
  const theme = useTheme()
  const {user,setUser} = useContext(UserContext)
  const referer = (props.location && props.location.state && props.location.state.referer) ? props.location.state.referer : '/';

  const handleIngresar = () =>{
    let body = {
      email : correo,
      contra : contra,
    }
    axios.post(`${url}usuario/sigInProv`,body,{headers:{
        'Content-Type': 'application/json',
      }}).then((result)=>{
        if(result.data==='USUARIO_NO_EXISTE') {
          alert('No se encuentra registrado en el sistema, por favor contactese con un administrador')
          setUser({})
        }
        else {
          setUser(
            result.data
          )
          if(result.data.idUsuario){
            setTimeout(()=>{
              history.push("/pruebasUsabilidad")
            },1500)
          } else {
            alert('Error en el login')
          }
        }
    })
  }

  return (
    <div style={{display:'flex'}}>
      <LoginBackground/>
      <LoginContainer>
        <Typography style={{color:'white',fontSize:'1.5rem',fontWeight:500}} >Bienvenido/a!</Typography>
        {/*<GoogleLoginButton referer={referer} />*/}
        <Grid >
          <Grid item >
            <Typography style={{color:'white'}}>Correo:</Typography>
          </Grid>
          <Grid item >
            <TexfieldTesis
              sx={{backgroundColor:'white',borderRadius:'10px'}}
              variant="outlined"
              value={correo}
              onChange={(e)=>{setCorreo(e.target.value)}}
            />
          </Grid>
          <Grid item  sx={{marginTop: "15px"}}>
            <Typography style={{color:'white'}}>Contraseña:</Typography>
          </Grid>
          <Grid item >
            <TexfieldTesis
              sx={{backgroundColor:'white',borderRadius:'10px'}}
              variant="outlined"
              type="password"
              value={contra}
              onChange={(e)=>{setContra(e.target.value)}}
            />
          </Grid>
        </Grid>
        <Grid item sx={12}>
          <ButtonTesis label="Ingresar" onClick={handleIngresar} variant="contained" endIcon={<NavigateNextIcon/>}/>
        </Grid>
      </LoginContainer>
    </div>
  );
};

export default Login;