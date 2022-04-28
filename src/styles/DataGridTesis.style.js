import { createTheme, createStyles } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

const defaultTheme = createTheme();
export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        border: 0,
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize:'1rem',
        },
        '& .MuiDataGrid-columnsContainer': {
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
          '&:focus':{
            outline:'none',
            backgroundColor:'inherit',
          }
        },
        '& .MuiDataGrid-row': {
          boxSizing: 'border-box',
          marginTop:12,
          maxWidth:'calc(100% - 1px)',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 10,
        },
        '& .MuiDataGrid-renderingZone': {
          maxHeight: 'unset!important',
          overflowY: 'auto',
          overflowX: 'clip'
        },
        '& .MuiDataGrid-virtualScrollerRenderZone': {
          position: 'relative',
          overflow: 'hidden',
        },
        '& .MuiDataGrid-virtualScrollerContent': {
          overflow: 'unset'
        },
      },
    }),
  { defaultTheme },
);