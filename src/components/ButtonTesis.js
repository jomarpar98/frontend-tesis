import React from "react";
import Button from '@mui/material/Button';

const ButtonTesis = (props) => {

  return (
    <Button {...props}>{props.label}</Button>
  );
};


export default ButtonTesis;