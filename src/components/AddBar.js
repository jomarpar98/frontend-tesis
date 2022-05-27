import IconButtonTesis from "./IconButtonTesis";
import AddIcon from "@mui/icons-material/Add";
import {Grid} from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material";

const AddBar = ({handleAdd}) => {
  const theme = useTheme()
  return (
    <Grid container xs={12} onClick={handleAdd} sx={{cursor: 'pointer',marginTop: '10px', marginBottom: '10px',border: 'dotted', opacity: '30%', padding: '20px'
      , borderRadius: '15px', justifyContent:'center', ":hover":{opacity: '100%',backgroundColor: theme.palette.select}}}>
      <IconButtonTesis sx={{color: 'black', border: 'dotted', ":hover":{backgroundColor: theme.palette.select}}}>
        < AddIcon />
      </IconButtonTesis>
    </Grid>
  )
}

export default AddBar