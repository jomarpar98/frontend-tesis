//Components

import ButtonTesis from "../components/ButtonTesis";
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtonTesis from "../components/IconButtonTesis";

export const ColumnsParticipantes = () => [
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
    sortable: true,
    filterable: false,
    valueGetter: (params) =>
      `${params.value} ${params.getValue(params.id, 'ap_paterno')} ${params.getValue(params.id, 'ap_materno')}`,
  },
  {
    field: "perfil",
    headerName: "Perfil",
    flex: 1,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return(
        cellValues.row.rol
      )
    }
  },
  { field: "correoElectronico", headerName: "Correo electrónico", flex: 1,  valueGetter: (params) =>
      `${params.getValue(params.id, 'correo_electronico')}`,
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
        cellValues.row.rol
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
            <IconButtonTesis onClick={()=>{ }}>
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
            <IconButtonTesis onClick={()=>{ }}>
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