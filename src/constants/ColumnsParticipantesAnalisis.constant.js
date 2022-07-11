//Components

import ButtonTesis from "../components/ButtonTesis";
//Mui
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import MovieIcon from '@mui/icons-material/Movie';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButtonTesis from "../components/IconButtonTesis";

export const ColumnsParticipantesAnalisis = (handleClickObservaciones,handleOpen,handleClickDescargar) => [
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
  },
  {
    field: "opciones2",
    headerName: "Observaciones",
    flex: 0.45,
    renderCell: (cellValues) => {
      return (
        <Grid container justifyContent="flex-start"  >
          <Grid item >
            <IconButtonTesis onClick={()=>{handleClickObservaciones(cellValues.row)}}>
              <VisibilityIcon  />
            </IconButtonTesis>
          </Grid>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  },
  {
    field: "opciones3",
    headerName: "Descargar",
    flex: 0.45,
    renderCell: (cellValues) => {
      return (
        <Grid container justifyContent="flex-start"  >
          <Grid item >
            <IconButtonTesis onClick={()=>{handleClickDescargar(cellValues.row)}}>
              <DownloadIcon  />
            </IconButtonTesis>
          </Grid>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];