import {useContext} from 'react'
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import axios from 'axios'
import {ReactComponent as GoogleSVG} from '../assets/google.svg'
import { useHistory, Redirect } from "react-router-dom"
import {refreshTokenSetup} from '../Utils/refreshToken.js'
import { UserContext } from '../context/UserContext';
import ButtonTesis from './ButtonTesis.js';
import GOOGLE_CLIENT_ID from '../constants/GoogleClientId.constant'
import { loginButtonStyle } from '../styles/Login.style.js';
import { SvgIcon } from '@mui/material';
import url from '../Config.js';


function GoogleLoginButton (props) {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const onLogoutSuccess = () => {
    setUser({});
    history.push('/login')
  }
  const onLogoutFailure = (response) => {
    // console.log(response)
    alert('Failed to log out')
  }
  const {signOut} = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onLogoutFailure,
  })

  const onSuccess = (response) => {
    if(response.tokenId){
      axios.post(`${url}usuario/sigIn`, { token:response.tokenId || response.tokenObj.id_token,
        clientID: GOOGLE_CLIENT_ID, email: response.profileObj.email},{headers:{
          'Content-Type': 'application/json',
        }})
        .then((result) => {
          console.log(result)
          if(result.data==='USUARIO_NO_EXISTE'){
            alert('No se encuentra registrado en el sistema, por favor contactese con un administrador')
            signOut()
          }else{
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
            result.data.accessToken = response.accessToken
            result.data.imageUrl = response.profileObj.imageUrl
            console.log(result.data)
            setUser(
              result.data
            )
          }
        });

      refreshTokenSetup(response);
    }
  }

  const onFailure = (response) => {
    // console.log(response)
    alert('Error al hacer login')
  }

  if(user && user.accessToken){
    return <Redirect to={props.referer && props.referer.pathname ? props.referer.pathname : '/'} />
  }

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <ButtonTesis style={loginButtonStyle} label="Iniciar con Google" startIcon={<SvgIcon style={{height:'30px',width:'30px',marginRight:'16px'}}><GoogleSVG/></SvgIcon>} onClick={renderProps.onClick} />
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
      accessType={'offline'}
      responseType={'token,code'}
    />
  )
}

export default GoogleLoginButton;