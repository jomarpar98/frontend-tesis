//Components

import ButtonTesis from "../components/ButtonTesis";
//Mui
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieIcon from '@mui/icons-material/Movie';
import IconButtonTesis from "../components/IconButtonTesis";

export const ColumnsParticipantesComenzar = (handleOpen) => [
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
    sortable: true,
    filterable: false,
    valueGetter: (params) =>
      `${params.value} ${params.getValue(params.id, 'apPaterno')} ${params.getValue(params.id, 'apMaterno')}`,
  },
  {
    field: "perfil",
    headerName: "Perfil",
    flex: 1,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return(
        cellValues.row.perfil
      )
    }
  },
  {
    field: "observador",
    headerName: "Observador",
    flex: 1,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return(
        cellValues.row.observador
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
            <IconButtonTesis onClick={()=>{ }}>
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
            <IconButtonTesis onClick={()=>{handleOpen()}}>
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