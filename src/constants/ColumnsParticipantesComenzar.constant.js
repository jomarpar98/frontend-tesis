//Components

import ButtonTesis from "../components/ButtonTesis";
//Mui
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieIcon from '@mui/icons-material/Movie';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButtonTesis from "../components/IconButtonTesis";

export const ColumnsParticipantesComenzar = (handleOpen,handleComenzar) => [
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return (
        `${cellValues.row.Usuario.nombre} ${cellValues.row.Usuario.apPaterno} ${cellValues.row.Usuario.apMaterno}`
      )
    }
  },
  {
    field: "perfil",
    headerName: "Perfil",
    flex: 1,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return(
        cellValues.row.PerfilParticipante.perfil
      )
    }
  },
  {
    field: "opciones",
    headerName: "Empezar prueba",
    flex: 0.45,
    renderCell: (cellValues) => {
      return (
        <Grid container justifyContent="flex-center" spacing={2}  >
          <Grid item >
            <IconButtonTesis onClick={()=>{handleComenzar(cellValues.row)}}>
              <PlayArrowIcon  />
            </IconButtonTesis>
          </Grid>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  },
  {
    field: "opciones2",
    headerName: "Grabaciones",
    flex: 0.45,
    renderCell: (cellValues) => {
      return (
        <Grid container justifyContent="flex-start"  >
          <Grid item >
            <IconButtonTesis onClick={()=>{handleOpen(cellValues.row)}}>
              <MovieIcon  />
            </IconButtonTesis>
          </Grid>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];