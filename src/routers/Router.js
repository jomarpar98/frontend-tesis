import { styled} from '@mui/material/styles';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import PruebasUsabilidad from "../pages/PruebasUsabilidad";

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    marginBottom: 56,
  },
}));

const Router = () => {

  return(
    <BrowserRouter>
      <Switch>
        <Route>
          <Root>
            <Route exact path="/" render={() => <Redirect to="/pruebasUsabilidad"/>}/>
            <Route exact path="/pruebasUsabilidad" component={PruebasUsabilidad}  />
          </Root>
        </Route>
        <Route render={() => <Redirect to="/pruebasUsabilidad"/>}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
