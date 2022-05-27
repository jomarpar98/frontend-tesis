import React from "react";
import { Checkbox } from "@mui/material";

const CheckboxTesis = (props) => {

  return (
    <Checkbox {...props}>{props.label}</Checkbox>
  );
};


export default CheckboxTesis;