import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import {useStyles} from '../styles/DataGridTesis.style.js'

const DataGridTesis = (props) => {
  const classes = useStyles();

  const localizedTextsMap = {
    columnHeaderSortIconLabel: 'Ordenar',
    noRowsLabel: 'No hay datos registrados',
  }

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        className={classes.root}
        pageSize={20}
        rowsPerPageOptions={[20]}
        localeText={localizedTextsMap}
        {...props}
      />
    </div>
  );
};

export default DataGridTesis;