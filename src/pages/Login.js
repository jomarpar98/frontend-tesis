import GoogleLoginButton from '../components/GoogleLoginButton';
import Typography from '@mui/material/Typography';
import { LoginBackground, LoginContainer, Logo } from '../styles/Login.style';

const Login = (props) => {

  const referer = (props.location && props.location.state && props.location.state.referer) ? props.location.state.referer : '/';

  return (
    <div style={{display:'flex'}}>
      <LoginBackground/>
      <LoginContainer>
        <Typography style={{color:'white',fontSize:'1.5rem',fontWeight:500}} >Bienvenido/a!</Typography>
        <GoogleLoginButton referer={referer} />
      </LoginContainer>
    </div>
  );
};

export default Login;