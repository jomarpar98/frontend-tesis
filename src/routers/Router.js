import { styled} from '@mui/material/styles';
import {BrowserRouter, Switch, Route, Redirect, useHistory} from "react-router-dom";
import PruebasUsabilidad from "../pages/PruebasUsabilidad";
import OpcionesPruebaUsabilidad from "../pages/PruebaUsabilidad";
import Participantes from "../pages/Participantes";
import Tareas from "../pages/Tareas";
import Cuestionarios from "../pages/Cuestionarios";
import Entrevista from "../pages/Entrevista";
import Miembros from "../pages/Miembros";
import Login from "../pages/Login";
import axios from "axios";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext";
import {useGoogleLogout} from "react-google-login";
import GOOGLE_CLIENT_ID from "../constants/GoogleClientId.constant";
import Navbar from "../components/Navbar";
import * as PropTypes from "prop-types";
import TabsNavigation from "../components/TabsNavigation";
import UsuariosSistema from "../pages/UsuariosSistema";
import Cuestionario from "../pages/Cuestionario";
import ComenzarParticipantes from "../pages/ComenzarParticipantes";
import CuestionariosResponder from "../pages/CuestionariosResponder";
import FichaObservacion from "../pages/FichaObservacion";
import TareasRealizar from "../pages/TareasRealizar";
import CuestionarioResponder from "../pages/CuestionarioResponder";
import OpcionesPruebaUsabilidadAnalisis from "../pages/PruebaUsabilidadAnalisis";
import ObservacionesRealizadas from "../pages/ObservacionesRealizadas";
import CuestionariosRealizados from "../pages/CuestionariosRealizados";
import CuestionarioRealizado from "../pages/CuestionarioRealizado";
import OpcionesMiembroPruebaUsabilidad from "../pages/PruebaUsabilidadEjecucionMiembro";
import ParticipantesObservar from "../pages/ParticipantesObservar";
import VisualizarObservaciones from "../pages/VisualizarObservaciones";

(function() {
  const localUser = JSON.parse(localStorage.getItem('user'))
  if (localUser && localUser.accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localUser.accessToken}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
})();

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    marginBottom: 56,
  },
}));

TabsNavigation.propTypes = {selection: PropTypes.string};
const Router = () => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));
  const [selection, setSelection] = useState("");

  const history = useHistory()
  const { user, setUser } = useContext(UserContext);

  const onLogoutSuccess = () => {
    axios.defaults.headers.common['Authorization'] = null
    setUser({});
    history.push('/login')
    // localStorage.clear();
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

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        signOut()
      }
      return Promise.reject(err);
    }
  );

  return(
    <BrowserRouter>
      <Navbar setSelection={setSelection}/>
      {hidden && <>
        <TabsNavigation selection={selection}/>
      </>}
      <Switch>
        <Route>
          <Root>
            <Route exact path="/" render={() => user.idRol === 2 ? <Redirect to="/usuariosSistema"/> : <Redirect to="/pruebasUsabilidad"/>}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/pruebasUsabilidad" component={PruebasUsabilidad}  />
            <Route exact path="/visualizar-prueba-usabilidad" component={OpcionesPruebaUsabilidad}  />
            <Route exact path="/miembros" component={Miembros}  />
            <Route exact path="/participantes" component={Participantes}  />
            <Route exact path="/cuestionarios" component={Cuestionarios}  />
            <Route exact path="/tareas" component={Tareas}  />
            <Route exact path="/entrevista" component={Entrevista}  />
            <Route exact path="/usuariosSistema" component={UsuariosSistema}  />
            <Route exact path="/visaulizar-cuestionario" component={Cuestionario}  />

            <Route exact path="/comenzar-prueba" component={ComenzarParticipantes}  />
            <Route exact path="/cuestionarios-a-responder" component={CuestionariosResponder}  />
            <Route exact path="/fichaObservacion" component={FichaObservacion}  />
            <Route exact path="/tareas-a-realizar" component={TareasRealizar}  />
            <Route exact path="/visualizar-cuestionario-responder" component={CuestionarioResponder}  />

            <Route exact path="/analisis-prueba-usabilidad" component={OpcionesPruebaUsabilidadAnalisis}  />
            <Route exact path="/observaciones-realizadas" component={ObservacionesRealizadas}  />
            <Route exact path="/cuestionarios-realizados" component={CuestionariosRealizados}  />
            <Route exact path="/visualizar-cuestionario-realizado" component={CuestionarioRealizado}  />

            <Route exact path="/ejecucion-miembro-prueba" component={OpcionesMiembroPruebaUsabilidad}  />
            <Route exact path="/participantes-observar" component={ParticipantesObservar}  />

            <Route exact path="/visualizar-observaciones" component={VisualizarObservaciones}/>
          </Root>
        </Route>
        <Route render={() => <Redirect to="/pruebasUsabilidad"/>}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
