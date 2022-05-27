//Components

import ButtonTesis from "../components/ButtonTesis";
//Mui
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieIcon from '@mui/icons-material/Movie';
import IconButtonTesis from "../components/IconButtonTesis";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const ColumnsPerfiles = (handleOpenNuevoPerfil,handleDeletePerfil) => [
  {
    field: "perfil",
    headerName: "Nombre",
    flex: 1,
    sortable: true,
    filterable: false,
    valueGetter: (params) =>
      `${params.value}`,
  },
  // {
  //   field: "cantidadParticipantes",
  //   headerName: "Nro. Participantes",
  //   flex: 1,
  //   sortable: true,
  //   filterable: false,
  //   renderCell: (cellValues) => {
  //     return(
  //       cellValues.row.cantParticipantes
  //     )
  //   }
  // },
  {
    field: "opciones",
    headerName: "Editar",
    flex: 0.45,
    renderCell: (cellValues) => {
      return (
        <Grid container justifyContent="flex-center" spacing={2}  >
          <Grid item >
            <IconButtonTesis onClick={()=>{handleOpenNuevoPerfil(false,cellValues.row)}}>
              <EditIcon  />
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
    headerName: "Eliminar",
    flex: 0.45,
    renderCell: (cellValues) => {
      return (
        <Grid container justifyContent="flex-start"  >
          <Grid item >
            <IconButtonTesis onClick={()=>{handleDeletePerfil(cellValues.row.idPerfilParticipante)}}>
              <DeleteForeverIcon  />
            </IconButtonTesis>
          </Grid>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];