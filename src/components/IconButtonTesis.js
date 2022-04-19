import React from "react";
import IconButton from '@mui/material/IconButton';

const IconButtonTesis = (props) => {

  return (
    <IconButton {...props}>{props.children}</IconButton>
  );
};
export default IconButtonTesis;