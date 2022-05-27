//Components

import ButtonTesis from "../components/ButtonTesis";
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtonTesis from "../components/IconButtonTesis";

export const ColumnsAgregarMiembros = () => [
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
    sortable: true,
    filterable: true,
    valueGetter: (params) =>
      `${params.value} ${params.getValue(params.id, 'apPaterno')} ${params.getValue(params.id, 'apMaterno')}`,
  },
  {
    field: "rol",
    headerName: "Rol",
    flex: 0.6,
    sortable: true,
    filterable: false,
    renderCell: (cellValues) => {
      return(
        cellValues.row.rol
      )
    }
  },
  { field: "correoElectronico", headerName: "Correo electrónico", flex: 1,  valueGetter: (params) =>
      `${params.getValue(params.id, 'email')}`,
    sortable: true,
    filterable: false,
  }
];