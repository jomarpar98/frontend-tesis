import React from "react";
import Button from '@mui/material/Button';
import {useTheme} from "@mui/material";


const ButtonTesis = (props) => {
  return (
    <Button {...props} >{props.label}</Button>
  );
};


export default ButtonTesis;