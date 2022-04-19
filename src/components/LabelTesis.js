import React from "react";
import { Typography } from "@mui/material";

const LabelTesis = (props) => {

  return (
    <Typography variant="body1" {...props} sx={{ marginLeft: props.marginLeft,  fontSize: props.fontSize && props.fontSize , fontWeight: props.fontWeight ? props.fontWeight : 'normal'}}>{props.children}</Typography>
  );
};


export default LabelTesis;