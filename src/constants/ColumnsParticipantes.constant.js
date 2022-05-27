//Components

import ButtonTesis from "../components/ButtonTesis";
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtonTesis from "../components/IconButtonTesis";

export const ColumnsParticipantes = (handleOpenNuevoParticipante,handleDeleteParticipante) => [
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return(
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
  { field: "correoElectronico", headerName: "Correo electrónico", flex: 1,
    renderCell: (cellValues) => {
      return(
        `${cellValues.row.Usuario.email}`
      )
    },
    sortable: true,
    filterable: false,
  },
  {
    field: "observador",
    headerName: "Observador",
    flex: 1,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return(
        `${cellValues.row.Observador.nombre} ${cellValues.row.Observador.apPaterno} ${cellValues.row.Observador.apMaterno}`
      )
    }
  },
  {
    field: "opciones",
    headerName: "Editar",
    flex: 0.45,
    renderCell: (cellValues) => {
      return (
        <Grid container justifyContent="flex-center" spacing={2}  >
          <Grid item >
            <IconButtonTesis onClick={()=>{handleOpenNuevoParticipante(false,cellValues.row)}}>
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
            <IconButtonTesis onClick={()=>{handleDeleteParticipante(cellValues.row.idUsuario) }}>
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