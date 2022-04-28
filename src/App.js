import React from 'react';
import { ThemeProvider as ThemeMaterial} from '@mui/material/styles';
import styled, {ThemeProvider as ThemeStyled} from "styled-components";
import Router from "./routers/Router";
import theme from './styles/theme';
import PruebasUsabilidad from "./pages/PruebasUsabilidad";
import {UserProvider} from "./context/UserContext";

const App = () => {

  const ScrollBarContent=styled.div`
    @media (min-width: 500px) {
      max-height: 100vh;
      ::-webkit-scrollbar {
        width: 9px;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #aaa;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #666;
      }

      overflow: auto;
    }
  `

  return (
    <ScrollBarContent >
      <ThemeMaterial theme = {theme}>
        <ThemeStyled theme = {theme}>
          <UserProvider>
            <Router/>
          </UserProvider>
        </ThemeStyled>
      </ThemeMaterial>
    </ScrollBarContent>
  );
}

export default App;
