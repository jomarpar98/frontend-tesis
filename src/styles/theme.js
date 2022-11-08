import { createTheme } from '@mui/material/styles';

const theme =createTheme(
  {
    typography: {
      fontFamily: "'Montserrat', sans-serif;",
      button: {
        textTransform: "none"
      },
      body1: {
        fontSize: 14,
      },
    },
    palette:{
      primary: {
        main:"#17A2B8",
        dark:"#69C3D1",
      },
      navColor: "#009892",
      casillas: "#F5FFE3",
      button: "#17A2B8",
      hover: "#69C3D1",
      white: "#FFFFFF",
      black: "#000000",
      fondo: "#ECECEC",
      select: "#d3d3d3",
      gris: "#bdbdbd",
    },
    shape: {
      borderRadius: 5,
    },
    weight: {
      regulr: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  }
);

export default theme;