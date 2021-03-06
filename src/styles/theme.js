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
        main:"#26A69A",
        dark:"#4CAF50",
      },
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